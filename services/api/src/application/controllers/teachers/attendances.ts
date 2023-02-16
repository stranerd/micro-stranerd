import { AttendancesUseCases, CoursesUseCases } from '@modules/teachers'
import { UsersUseCases } from '@modules/users'
import {
	BadRequestError,
	NotAuthorizedError,
	QueryKeys,
	QueryParams,
	Request,
	Schema, validateReq
} from '@utils/app/package'

export class AttendanceController {
	static async FindAttendance (req: Request) {
		const attendance = await AttendancesUseCases.find(req.params.id)
		if (!attendance || attendance.courseId !== req.params.courseId || !attendance.members.includes(req.authUser!.id)) return null
		return attendance
	}

	static async GetAttendance (req: Request) {
		const query = req.query as QueryParams
		query.authType = QueryKeys.and
		query.auth = [{ field: 'courseId', value: req.params.courseId },
			{ field: 'members', value: req.authUser!.id }]
		return await AttendancesUseCases.get(query)
	}

	static async UpdateAttendance (req: Request) {
		const authUserId = req.authUser!.id

		const data = validateReq({
			title: Schema.string().min(1),
		}, req.body)

		const updatedAttendance = await AttendancesUseCases.update({
			courseId: req.params.courseId,
			id: req.params.id,
			userId: authUserId,
			data
		})

		if (updatedAttendance) return updatedAttendance
		throw new NotAuthorizedError()
	}

	static async CreateAttendance (req: Request) {
		const { title, courseId } = validateReq({
			title: Schema.string().min(1),
			courseId: Schema.string().min(1),
		}, { ...req.body, courseId: req.params.courseId })

		const userId = req.authUser!.id
		const course = await CoursesUseCases.find(courseId)
		if (!course || course.user.id !== userId) throw new NotAuthorizedError()

		const user = await UsersUseCases.find(userId)
		if (!user || user.isDeleted()) throw new BadRequestError('user not found')

		return await AttendancesUseCases.add({
			courseId: course.id, members: course.members,
			title, user: user.getEmbedded()
		})
	}

	static async DeleteAttendance (req: Request) {
		const authUserId = req.authUser!.id
		const isDeleted = await AttendancesUseCases.delete({
			courseId: req.params.courseId,
			id: req.params.id,
			userId: authUserId
		})
		if (isDeleted) return isDeleted
		throw new NotAuthorizedError()
	}

	static async CloseAttendance (req: Request) {
		const authUserId = req.authUser!.id
		const isClosed = await AttendancesUseCases.close({
			courseId: req.params.courseId,
			id: req.params.id,
			userId: authUserId
		})
		if (isClosed) return isClosed
		throw new NotAuthorizedError()
	}

	static async GenerateToken (req: Request) {
		const authUserId = req.authUser!.id
		const token = await AttendancesUseCases.generateToken({
			courseId: req.params.courseId,
			id: req.params.id,
			userId: authUserId
		})
		if (token) return token
		throw new NotAuthorizedError()
	}

	static async TickAttendance (req: Request) {
		const authUserId = req.authUser!.id
		const { token } = validateReq({
			token: Schema.string()
		}, req.body)
		const ticked = await AttendancesUseCases.tick({
			courseId: req.params.courseId, id: req.params.id,
			token, userId: authUserId
		})
		if (ticked) return ticked
		throw new NotAuthorizedError()
	}
}