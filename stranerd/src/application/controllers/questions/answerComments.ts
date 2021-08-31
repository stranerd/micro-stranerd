import { AddAnswerComment, DeletAnswerComments, FindAnswerComment, GetAnswerComments } from '@modules/questions'
import { FindUser } from '@modules/users'
import { NotFoundError, QueryParams, Request, validate, Validation } from '@utils/commons'

export class AnswerCommentController {
	static async FindAnswerComment (req: Request) {
		return await FindAnswerComment.execute(req.params.id)
	}

	static async GetAnswerComments (req: Request) {
		const query = req.body as QueryParams
		return await GetAnswerComments.execute(query)
	}

	static async DeleteAnswerComments (req: Request) {
		return await DeletAnswerComments.execute({answerId: req.params.answerId})
	}

	static async CreateAnswerComment (req: Request) {
		const isLongerThan2 = (val: string) => Validation.isLongerThan(val, 2)

		const data = validate({
			body: req.body.body,
			answerId: req.body.answerId
		}, {
			body: { required: true, rules: [isLongerThan2] },
			answerId: { required: true, rules: [] }
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