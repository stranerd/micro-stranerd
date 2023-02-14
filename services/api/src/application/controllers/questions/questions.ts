import { TagsUseCases, TagTypes } from '@modules/interactions'
import { PlanDataType, WalletsUseCases } from '@modules/payment'
import { AnswersUseCases, QuestionsUseCases } from '@modules/questions'
import { UsersUseCases } from '@modules/users'
import {
	AuthRole,
	BadRequestError,
	NotAuthorizedError,
	QueryKeys,
	QueryParams,
	Request,
	Schema,
	validateReq
} from '@utils/app/package'

export class QuestionController {
	static async FindQuestion(req: Request) {
		return await QuestionsUseCases.find(req.params.id)
	}

	static async GetQuestion(req: Request) {
		const query = req.query as QueryParams
		if (!req.authUser?.roles[AuthRole.isStranerdTutor]) {
			query.auth = [{ field: 'isPrivate', value: false }]
			if (req.authUser) {
				query.authType = QueryKeys.or
				query.auth.push({ field: 'user.id', value: req.authUser!.id })
			}
		}
		return await QuestionsUseCases.get(query)
	}

	static async UpdateQuestion(req: Request) {
		const authUserId = req.authUser!.id

		const data = validateReq(
			{
				body: Schema.string().min(3, true),
				attachments: Schema.array(Schema.file().image()).max(5)
			},
			req.body
		)

		const updatedQuestion = await QuestionsUseCases.update({
			id: req.params.id,
			userId: authUserId,
			data: { ...data, attachments: data.attachments as any }
		})

		if (updatedQuestion) return updatedQuestion
		throw new NotAuthorizedError()
	}

	static async CreateQuestion(req: Request) {
		const data = validateReq(
			{
				body: Schema.string().min(3, true),
				tagId: Schema.string().min(1),
				isPrivate: Schema.boolean(),
				attachments: Schema.array(Schema.file().image()).max(5)
			},
			req.body
		)

		const tag = await TagsUseCases.find(data.tagId)
		if (!tag || !tag.parent || tag.type !== TagTypes.questions)
			throw new BadRequestError('invalid tagId')
		const user = await UsersUseCases.find(req.authUser!.id)
		if (!user || user.isDeleted())
			throw new BadRequestError('user not found')
		const wallet = await WalletsUseCases.get(user.id)
		if (wallet.subscription.data[PlanDataType.questions] < 1)
			throw new BadRequestError('you don\'t have any questions left')

		return await QuestionsUseCases.add({
			...data,
			attachments: data.attachments as any,
			user: user.getEmbedded()
		})
	}

	static async MarkBestAnswer(req: Request) {
		const authUserId = req.authUser!.id

		const { answerId } = validateReq(
			{
				answerId: Schema.string().min(1)
			},
			req.body
		)

		const question = await QuestionsUseCases.find(req.params.id)
		const answer = await AnswersUseCases.find(answerId)
		if (!question) throw new BadRequestError('question not found')
		if (!answer || answer.questionId !== question.id)
			throw new BadRequestError('invalid answer')
		if (question.user.id !== authUserId) throw new NotAuthorizedError()
		if (question.isAnswered)
			throw new BadRequestError('question is already answered')
		if (question.bestAnswers.find((a) => a === answerId))
			throw new BadRequestError('answer is already marked best answer')

		return await QuestionsUseCases.updateBestAnswer({
			id: question.id,
			answerId,
			userId: authUserId,
			add: true
		})
	}

	static async DeleteQuestion(req: Request) {
		const authUserId = req.authUser!.id
		const isDeleted = await QuestionsUseCases.delete({
			id: req.params.id,
			userId: authUserId
		})
		if (isDeleted) return isDeleted
		throw new NotAuthorizedError()
	}
}
