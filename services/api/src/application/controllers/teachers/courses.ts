import { CoursesUseCases } from '@modules/teachers'
import { UsersUseCases } from '@modules/users'
import { BadRequestError, NotAuthorizedError, QueryParams, Request, Schema, validateReq } from '@utils/app/package'

export class CourseController {
	static async FindCourse (req: Request) {
		return await CoursesUseCases.find(req.params.id)
	}

	static async GetCourse (req: Request) {
		const query = req.query as QueryParams
		return await CoursesUseCases.get(query)
	}

	static async UpdateCourse (req: Request) {
		const authUserId = req.authUser!.id

		const data = validateReq({
			title: Schema.string().min(1),
			level: Schema.string().min(1)
		}, req.body)

		const updatedCourse = await CoursesUseCases.update({ id: req.params.id, userId: authUserId, data })

		if (updatedCourse) return updatedCourse
		throw new NotAuthorizedError()
	}

	static async CreateCourse (req: Request) {
		const data = validateReq({
			title: Schema.string().min(1),
			level: Schema.string().min(1)
		}, req.body)

		const user = await UsersUseCases.find(req.authUser!.id)
		if (!user || user.isDeleted()) throw new BadRequestError('user not found')

		return await CoursesUseCases.add({ ...data, user: user.getEmbedded() })
	}

	static async DeleteCourse (req: Request) {
		const authUserId = req.authUser!.id
		const isDeleted = await CoursesUseCases.delete({ id: req.params.id, userId: authUserId })
		if (isDeleted) return isDeleted
		throw new NotAuthorizedError()
	}

	static async JoinCourse (req: Request) {
		const userId = req.authUser!.id
		const { join } = validateReq({
			join: Schema.boolean()
		}, req.body)

		const isJoined = await CoursesUseCases.join({ courseId: req.params.id, userId, join })
		if (isJoined) return isJoined
		throw new NotAuthorizedError()
	}
}