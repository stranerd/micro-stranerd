import { AddComment, CommentType, FindComment, GetComments } from '@modules/study'
import { FindUser } from '@modules/users'
import { NotFoundError, QueryParams, Request, validate, Validation } from '@utils/commons'

export class CommentController {
	static async FindComment (req: Request) {
		return await FindComment.execute(req.params.id)
	}

	static async GetComments (req: Request) {
		const query = req.query as QueryParams
		return await GetComments.execute(query)
	}

	static async CreateComment (req: Request) {
		const isVideoType = req.body.data?.type === CommentType.video

		const { body, type, videoId } = validate({
			body: req.body.body,
			type: req.body.data?.type,
			videoId: req.body.data?.videoId
		}, {
			body: { required: true, rules: [Validation.isString, Validation.isLongerThanX(2)] },
			type: {
				required: true,
				rules: [Validation.isString, Validation.arrayContainsX(Object.values(CommentType), (cur, val) => cur === val)]
			},
			videoId: { required: false, rules: [Validation.isRequiredIfX(isVideoType), Validation.isString] }
		})

		const authUserId = req.authUser!.id

		const user = await FindUser.execute(authUserId)

		if (user) return await AddComment.execute({
			body, userId: user.id, userBio: user.bio,
			data: isVideoType ? { type, videoId } : ({} as any)
		})

		throw new NotFoundError()
	}
}