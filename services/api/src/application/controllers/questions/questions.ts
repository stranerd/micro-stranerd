import { QuestionsUseCases, TagsUseCases } from '@modules/questions'
import { UsersUseCases } from '@modules/users'
import { BadRequestError, NotAuthorizedError, QueryParams, Request, validate, Validation } from '@utils/commons'

export class QuestionController {
	static async FindQuestion (req: Request) {
		return await QuestionsUseCases.find(req.params.id)
	}

	static async GetQuestion (req: Request) {
		const query = req.query as QueryParams
		return await QuestionsUseCases.get(query)
	}

	static async UpdateQuestion (req: Request) {
		const authUserId = req.authUser!.id

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

		const updatedQuestion = await QuestionsUseCases.update({ id: req.params.id, userId: authUserId, data })

		if (updatedQuestion) return updatedQuestion
		throw new NotAuthorizedError()
	}

	static async CreateQuestion (req: Request) {
		const data = validate({
			body: req.body.body,
			tagId: req.body.tagId,
			attachments: req.body.attachments
		}, {
			body: { required: true, rules: [Validation.isString, Validation.isExtractedHTMLLongerThanX(2)] },
			tagId: { required: true, rules: [Validation.isString] },
			attachments: {
				required: true,
				rules: [Validation.isArrayOfX((cur) => Validation.isImage(cur).valid, 'images'), Validation.hasLessThanX(6)]
			}
		})

		const user = await UsersUseCases.find(req.authUser!.id)
		if (!user) throw new BadRequestError('user not found')
		const tag = await TagsUseCases.find(data.tagId)
		if (!tag || !!tag.parent) throw new BadRequestError('invalid tagId')

		return await QuestionsUseCases.add({ ...data, user: user.getEmbedded() })
	}

	static async MarkBestAnswer (req: Request) {
		const authUserId = req.authUser!.id

		const { answerId } = validate({
			answerId: req.body.answerId
		}, {
			answerId: { required: true, rules: [Validation.isString] }
		})

		const question = await QuestionsUseCases.find(req.params.id)
		if (!question) throw new BadRequestError('question not found')
		if (question.user.id !== authUserId) throw new NotAuthorizedError()
		if (question.isAnswered) throw new BadRequestError('question is already answered')
		if (question.bestAnswers.find((a) => a === answerId)) throw new BadRequestError('answer is already marked best answer')

		return await QuestionsUseCases.updateBestAnswer({
			id: question.id,
			answerId,
			userId: authUserId,
			add: true
		})
	}

	static async DeleteQuestion (req: Request) {
		const authUserId = req.authUser!.id
		const isDeleted = await QuestionsUseCases.delete({ id: req.params.id, userId: authUserId })
		if (isDeleted) return isDeleted
		throw new NotAuthorizedError()
	}
}