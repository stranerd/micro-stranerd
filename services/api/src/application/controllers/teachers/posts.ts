import { CoursesUseCases, PostsUseCases, PostType } from '@modules/teachers'
import { UsersUseCases } from '@modules/users'
import {
	BadRequestError, NotAuthorizedError,
	QueryKeys,
	QueryParams,
	Request,
	Schema, validateReq
} from '@utils/app/package'

export class PostController {
	static async FindPost (req: Request) {
		const post = await PostsUseCases.find(req.params.id)
		if (!post || post.courseId !== req.params.courseId || !post.members.includes(req.authUser!.id)) return null
		return post
	}

	static async GetPost (req: Request) {
		const query = req.query as QueryParams
		query.authType = QueryKeys.and
		query.auth = [{ field: 'courseId', value: req.params.courseId },
			{ field: 'members', value: req.authUser!.id }]
		return await PostsUseCases.get(query)
	}

	static async CreatePost (req: Request) {
		const { title, courseId, description, attachments, data } = validateReq({
			title: Schema.string().min(1),
			description: Schema.string().min(1),
			deadline: Schema.number().gt(0).nullable(),
			courseId: Schema.string().min(1),
			data: Schema.object({
				type: Schema.any<PostType.announcements | PostType.discussions>().in([PostType.announcements, PostType.discussions], (cur, val) => cur === val),
			}),
			attachments: Schema.array(Schema.file().image())
		}, {
			...req.body, courseId: req.params.courseId
		})

		const userId = req.authUser!.id
		const course = await CoursesUseCases.find(courseId)
		if (!course || course.user.id !== userId) throw new NotAuthorizedError()

		const user = await UsersUseCases.find(userId)
		if (!user || user.isDeleted()) throw new BadRequestError('user not found')

		return await PostsUseCases.add({
			courseId: course.id, members: course.members, data,
			title, description, attachments: attachments as any, user: user.getEmbedded()
		})
	}

	static async DeletePost (req: Request) {
		const authUserId = req.authUser!.id
		const isDeleted = await PostsUseCases.delete({
			courseId: req.params.courseId,
			id: req.params.id,
			userId: authUserId
		})
		if (isDeleted) return isDeleted
		throw new NotAuthorizedError()
	}
}