import { CoursesUseCases, PostsUseCases, PostType } from '@modules/teachers'
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
		const acceptableTypes = Object.keys(PostType).filter((type) => type !== PostType.assignments)

		const { title, courseId, description, attachments, type } = validate({
			title: req.body.title,
			description: req.body.description,
			deadline: req.body.deadline,
			courseId: req.params.courseId,
			attachments: req.body.attachments,
			type: req.body.data.type
		}, {
			title: { required: true, rules: [Validation.isString(), Validation.isMinOf(1)] },
			description: { required: true, rules: [Validation.isString(), Validation.isMinOf(1)] },
			deadline: { required: true, nullable: true, rules: [Validation.isNumber(), Validation.isMoreThan(0)] },
			courseId: { required: true, rules: [Validation.isString()] },
			attachments: {
				required: true,
				rules: [Validation.isArrayOf((cur) => Validation.isImage()(cur).valid, 'images'), Validation.hasMaxOf(5)]
			},
			type: {
				required: true, rules: [Validation.arrayContains(acceptableTypes, (cur, val) => cur === val)]
			}
		})

		const userId = req.authUser!.id
		const course = await CoursesUseCases.find(courseId)
		if (!course || course.user.id !== userId) throw new NotAuthorizedError()

		const user = await UsersUseCases.find(userId)
		if (!user || user.isDeleted()) throw new BadRequestError('user not found')

		return await PostsUseCases.add({
			courseId: course.id, members: course.members,
			title, description, attachments, user: user.getEmbedded(),
			data: { type }
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