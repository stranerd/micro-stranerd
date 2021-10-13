import { AddVideoComment, FindVideoComment, GetVideoComments } from '@modules/resources'
import { FindUser } from '@modules/users'
import { NotFoundError, QueryParams, Request, validate, Validation } from '@utils/commons'

export class VideoCommentController {
	static async FindVideoComment (req: Request) {
		return await FindVideoComment.execute(req.params.id)
	}

	static async GetVideoComments (req: Request) {
		const query = req.query as QueryParams
		return await GetVideoComments.execute(query)
	}

	static async CreateVideoComment (req: Request) {
		const data = validate({
			body: req.body.body,
			videoId: req.body.videoId
		}, {
			body: { required: true, rules: [Validation.isString, Validation.isLongerThanX(2)] },
			videoId: { required: true, rules: [Validation.isString] }
		})

		const authUserId = req.authUser!.id

		const user = await FindUser.execute(authUserId)

		if (user) return await AddVideoComment.execute({
			...data,
			userBio: user.bio,
			userId: req.authUser!.id
		})

		throw new NotFoundError()
	}
}