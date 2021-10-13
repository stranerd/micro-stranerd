import { AddAnswerComment, FindAnswerComment, GetAnswerComments } from '@modules/questions'
import { FindUser } from '@modules/users'
import { NotFoundError, QueryParams, Request, validate, Validation } from '@utils/commons'

export class AnswerCommentController {
	static async FindAnswerComment (req: Request) {
		return await FindAnswerComment.execute(req.params.id)
	}

	static async GetAnswerComments (req: Request) {
		const query = req.query as QueryParams
		return await GetAnswerComments.execute(query)
	}

	static async CreateAnswerComment (req: Request) {
		const data = validate({
			body: req.body.body,
			answerId: req.body.answerId
		}, {
			body: { required: true, rules: [Validation.isString, Validation.isLongerThanX(2)] },
			answerId: { required: true, rules: [Validation.isString] }
		})

		const authUserId = req.authUser!.id

		const user = await FindUser.execute(authUserId)

		if (user) {
			return await AddAnswerComment.execute({
				...data,
				userBio: user.bio,
				userId: req.authUser!.id
			})
		}

		throw new NotFoundError()
	}
}