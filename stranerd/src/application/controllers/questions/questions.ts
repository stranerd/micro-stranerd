import {
	AddQuestion,
	DeleteQuestion,
	FindQuestion,
	GetQuestions,
	MarkBestAnswer,
	UpdateQuestion
} from '@modules/questions'
import { FindUser } from '@modules/users'
import {
	NotAuthorizedError,
	NotFoundError,
	QueryParams,
	Request,
	validate,
	Validation,
	ValidationError
} from '@utils/commons'

export class QuestionController {
	static async FindQuestion (req: Request) {
		return await FindQuestion.execute(req.params.id)
	}

	static async GetQuestion (req: Request) {
		const query = req.body as QueryParams
		return await GetQuestions.execute(query)
	}

	static async UpdateQuestion (req: Request) {
		const data = validate({
			body: req.body.body,
			coins: req.body.coins
		}, {
			body: { required: true, rules: [Validation.isExtractedHTMLLongerThanX(2)] },
			coins: { required: true, rules: [Validation.isMoreThanX(19), Validation.isLessThanX(101)] }
		})

		const authUserId = req.authUser!.id

		const updatedQuestion = await UpdateQuestion.execute({ id: req.params.id, userId: authUserId, data })

		if (updatedQuestion) return updatedQuestion
		throw new NotAuthorizedError()
	}

	static async CreateQuestion (req: Request) {
		const data = validate({
			body: req.body.body,
			subjectId: req.body.subjectId,
			coins: req.body.coins,
			tags: req.body.tags
		}, {
			body: { required: true, rules: [Validation.isExtractedHTMLLongerThanX(2)] },
			coins: { required: true, rules: [Validation.isMoreThanX(19), Validation.isLessThanX(101)] },
			subjectId: { required: true, rules: [] },
			tags: { required: true, rules: [Validation.isMoreThanX(0), Validation.isLessThanX(4)] }
		})

		const authUserId = req.authUser!.id

		const user = await FindUser.execute(authUserId)

		if (user) return await AddQuestion.execute({
			...data,
			userBio: user.bio,
			userId: authUserId
		})
		throw new NotFoundError()
	}

	static async MarkBestAnswer (req: Request) {
		const authUserId = req.authUser!.id

		const { answerId } = validate({
			answerId: req.body.answerId
		}, {
			answerId: { required: true, rules: [] }
		})

		const question = await FindQuestion.execute(req.params.id)
		if (!question) throw new NotFoundError()
		if (question.userId !== authUserId) throw new NotAuthorizedError()
		if (question.isAnswered) throw new ValidationError([{
			field: 'answerId',
			messages: ['question is already answered']
		}])
		if (question.answers.find((a) => a.id === answerId)) throw new ValidationError([{
			field: 'answerId',
			messages: ['answer is already marked as a best answer']
		}])

		return await MarkBestAnswer.execute({
			id: question.id,
			answerId,
			userId: authUserId
		})
	}

	static async DeleteQuestion (req: Request) {
		const authUserId = req.authUser!.id
		const isDeleted = await DeleteQuestion.execute({ id: req.params.id, userId: authUserId })
		if (isDeleted) return isDeleted
		throw new NotAuthorizedError()
	}
}