import { AnswersUseCases, QuestionsUseCases } from '@modules/questions'
import { UsersUseCases } from '@modules/users'
import { BadRequestError, NotAuthorizedError, QueryParams, Request, validate, Validation } from '@utils/commons'

export class AnswerController {
	static async FindAnswer (req: Request) {
		return await AnswersUseCases.find(req.params.id)
	}

	static async GetAnswers (req: Request) {
		const query = req.query as QueryParams
		return await AnswersUseCases.get(query)
	}

	static async UpdateAnswer (req: Request) {
		const data = validate({
			body: req.body.body,
			attachments: req.body.attachments
		}, {
			body: { required: true, rules: [Validation.isString, Validation.isExtractedHTMLLongerThanX(2)] },
			attachments: {
				required: true,
				rules: [Validation.isArrayOfX((cur) => Validation.isImage(cur).valid, 'images'), Validation.hasLessThanX(6)]
			}
		})

		const authUserId = req.authUser!.id
		const updatedAnswer = await AnswersUseCases.update({ id: req.params.id, userId: authUserId, data })

		if (updatedAnswer) return updatedAnswer
		throw new NotAuthorizedError()
	}

	static async CreateAnswer (req: Request) {
		const data = validate({
			body: req.body.body,
			questionId: req.body.questionId,
			attachments: req.body.attachments
		}, {
			body: { required: true, rules: [Validation.isString, Validation.isExtractedHTMLLongerThanX(2)] },
			questionId: { required: true, rules: [Validation.isString] },
			attachments: {
				required: true,
				rules: [Validation.isArrayOfX((cur) => Validation.isImage(cur).valid, 'images'), Validation.hasLessThanX(6)]
			}
		})

		const question = await QuestionsUseCases.find(req.body.questionId)
		if (!question) throw new BadRequestError('question not found')
		if (question.isAnswered) throw new BadRequestError('question already answered')
		const user = await UsersUseCases.find(req.authUser!.id)
		if (!user) throw new BadRequestError('user not found')
		return await AnswersUseCases.add({ ...data, user: user.getEmbedded(), tagId: question.tagId })
	}

	static async DeleteAnswer (req: Request) {
		const isDeleted = await AnswersUseCases.delete({ id: req.params.id, userId: req.authUser!.id })
		if (isDeleted) return isDeleted
		throw new NotAuthorizedError()
	}
}