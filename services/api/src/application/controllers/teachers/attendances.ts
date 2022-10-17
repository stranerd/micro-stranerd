import { AttendancesUseCases, CoursesUseCases } from '@modules/teachers'
import { UsersUseCases } from '@modules/users'
import {
	BadRequestError,
	NotAuthorizedError,
	QueryKeys,
	QueryParams,
	Request,
	validate,
	Validation
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

		const data = validate({
			title: req.body.title
		}, {
			title: { required: true, rules: [Validation.isString, Validation.isLongerThanX(0)] }
		})

		const updatedAttendance = await AttendancesUseCases.update({ id: req.params.id, userId: authUserId, data })

		if (updatedAttendance) return updatedAttendance
		throw new NotAuthorizedError()
	}

	static async CreateAttendance (req: Request) {
		const { title, courseId } = validate({
			title: req.body.title,
			courseId: req.params.courseId
		}, {
			title: { required: true, rules: [Validation.isString, Validation.isLongerThanX(0)] },
			courseId: { required: true, rules: [Validation.isString] }
		})

		const userId = req.authUser!.id
		const course = await CoursesUseCases.find(courseId)
		if (!course || course.user.id !== userId) throw new NotAuthorizedError()

		const user = await UsersUseCases.find(userId)
		if (!user) throw new BadRequestError('user not found')

		return await AttendancesUseCases.add({
			courseId: course.id, members: course.members,
			title, user: user.getEmbedded()
		})
	}

	static async DeleteAttendance (req: Request) {
		const authUserId = req.authUser!.id
		const isDeleted = await AttendancesUseCases.delete({ id: req.params.id, userId: authUserId })
		if (isDeleted) return isDeleted
		throw new NotAuthorizedError()
	}
}