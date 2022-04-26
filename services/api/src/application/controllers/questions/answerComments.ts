import { AddAnswerComment, FindAnswer, FindAnswerComment, GetAnswerComments } from '@modules/questions'
import { UsersUseCases } from '@modules/users'
import { BadRequestError, QueryParams, Request, validate, Validation } from '@utils/commons'

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

		const answer = await FindAnswer.execute(data.answerId)
		if (!answer) throw new BadRequestError('answer not found')
		const user = await UsersUseCases.find(req.authUser!.id)
		if (!user) throw new BadRequestError('user not found')
		return await AddAnswerComment.execute({
			...data,
			userBio: user.bio,
			userRoles: user.roles,
			userId: user.id
		})
	}
}