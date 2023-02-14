import { AnswersUseCases, QuestionsUseCases } from '@modules/questions'
import { UsersUseCases } from '@modules/users'
import {
	BadRequestError,
	NotAuthorizedError,
	QueryParams,
	Request,
	Schema,
	validateReq
} from '@utils/app/package'

export class AnswerController {
	static async FindAnswer(req: Request) {
		return await AnswersUseCases.find(req.params.id)
	}

	static async GetAnswers(req: Request) {
		const query = req.query as QueryParams
		return await AnswersUseCases.get(query)
	}

	static async UpdateAnswer(req: Request) {
		const data = validateReq(
			{
				body: Schema.string().min(3, true),
				attachments: Schema.array(Schema.file().image()).max(5)
			},
			req.body
		)

		const authUserId = req.authUser!.id
		const updatedAnswer = await AnswersUseCases.update({
			id: req.params.id,
			userId: authUserId,
			data: { ...data, attachments: data.attachments as any }
		})

		if (updatedAnswer) return updatedAnswer
		throw new NotAuthorizedError()
	}

	static async CreateAnswer(req: Request) {
		const data = validateReq(
			{
				body: Schema.string().min(3, true),
				questionId: Schema.string().min(1),
				attachments: Schema.array(Schema.file().image()).max(5)
			},
			req.body
		)

		const question = await QuestionsUseCases.find(data.questionId)
		if (!question) throw new BadRequestError('question not found')
		if (question.isAnswered)
			throw new BadRequestError('question already answered')
		const user = await UsersUseCases.find(req.authUser!.id)
		if (!user || user.isDeleted())
			throw new BadRequestError('user not found')
		return await AnswersUseCases.add({
			...data,
			attachments: data.attachments as any,
			user: user.getEmbedded(),
			tagId: question.tagId
		})
	}

	static async DeleteAnswer(req: Request) {
		const isDeleted = await AnswersUseCases.delete({
			id: req.params.id,
			userId: req.authUser!.id
		})
		if (isDeleted) return isDeleted
		throw new NotAuthorizedError()
	}
}
