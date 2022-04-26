import {
	AddAnswer,
	CreateAnswerUpvote,
	DeleteAnswer,
	FindAnswer,
	FindQuestion,
	GetAnswers,
	UpdateAnswer
} from '@modules/questions'
import { UsersUseCases } from '@modules/users'
import { BadRequestError, NotAuthorizedError, QueryParams, Request, validate, Validation } from '@utils/commons'

export class AnswerController {
	static async FindAnswer (req: Request) {
		return await FindAnswer.execute(req.params.id)
	}

	static async GetAnswers (req: Request) {
		const query = req.query as QueryParams
		return await GetAnswers.execute(query)
	}

	static async UpdateAnswer (req: Request) {
		const data = validate({
			title: req.body.title,
			body: req.body.body,
			attachments: req.body.attachments
		}, {
			title: { required: true, rules: [Validation.isString, Validation.isExtractedHTMLLongerThanX(2)] },
			body: { required: true, rules: [Validation.isString] },
			attachments: {
				required: true,
				rules: [Validation.isArrayOfX((cur) => Validation.isImage(cur).valid, 'images'), Validation.hasLessThanX(6)]
			}
		})

		const authUserId = req.authUser!.id
		const updatedAnswer = await UpdateAnswer.execute({ id: req.params.id, userId: authUserId, data })

		if (updatedAnswer) return updatedAnswer
		throw new NotAuthorizedError()
	}

	static async CreateAnswer (req: Request) {
		const data = validate({
			title: req.body.title,
			body: req.body.body,
			questionId: req.body.questionId,
			attachments: req.body.attachments
		}, {
			title: { required: true, rules: [Validation.isString, Validation.isExtractedHTMLLongerThanX(2)] },
			body: { required: true, rules: [Validation.isString] },
			questionId: { required: true, rules: [Validation.isString] },
			attachments: {
				required: true,
				rules: [Validation.isArrayOfX((cur) => Validation.isImage(cur).valid, 'images'), Validation.hasLessThanX(6)]
			}
		})

		const question = await FindQuestion.execute(req.body.questionId)
		if (!question) throw new BadRequestError('question not found')
		const user = await UsersUseCases.find(req.authUser!.id)
		if (!user) throw new BadRequestError('user not found')
		return await AddAnswer.execute({
			...data,
			userBio: user.bio,
			userRoles: user.roles,
			userId: user.id
		})
	}

	static async DeleteAnswer (req: Request) {
		const isDeleted = await DeleteAnswer.execute({ id: req.params.id, userId: req.authUser!.id })
		if (isDeleted) return isDeleted
		throw new NotAuthorizedError()
	}

	static async VoteAnswer (req: Request) {
		const vote = !!req.body.vote
		const answer = await FindAnswer.execute(req.params.id)
		if (!answer) throw new BadRequestError('answer not found')
		return await CreateAnswerUpvote.execute({
			answerId: req.params.id,
			userId: req.authUser!.id,
			vote: vote ? 1 : -1
		})
	}
}