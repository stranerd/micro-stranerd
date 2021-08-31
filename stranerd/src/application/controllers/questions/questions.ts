import {
	AddQuestion,
	DeleteQuestion,
	FindQuestion,
	GetQuestions,
	MarkBestAnswer,
	UpdateQuestion
} from '@modules/questions'
import { FindUser } from '@modules/users'
import { NotAuthorizedError, NotFoundError, QueryParams, Request, validate, Validation } from '@utils/commons'

export class QuestionController {
	static async FindQuestion (req: Request) {
		return await FindQuestion.execute(req.params.id)
	}

	static async GetQuestion (req: Request) {
		const query = req.body as QueryParams
		return await GetQuestions.execute(query)
	}

	static async UpdateQuestion (req: Request) {
		const isMoreThan0 = (val: number) => Validation.isMoreThan(val, 0)
		const isLongerThan2 = (val: string) => Validation.isLongerThan(val, 2)
		const isLessThan100 = (val: number) => Validation.isLessThan(val, 101)
		const isLessThan4 = (val: string[]) => Validation.isLessThan(val.length, 5)
		const isGreaterThan20 = (val: number) => Validation.isMoreThan(val, 20)

		const data = validate({
			body: req.body.body,
			subjectId: req.body.subjectId,
			coins: req.body.coin,
			tags: req.body.tags
		}, {
			body: { required: true, rules: [isLongerThan2] },
			subjectId: { required: true, rules: [] },
			coins: { required: true, rules: [isGreaterThan20, isLessThan100] },
			tags: { required: true, rules: [isMoreThan0, isLessThan4] }
		})

		const authUserId = req.authUser!.id

		const updatedQuestion = await UpdateQuestion.execute({ id: req.params.id, userId: authUserId, data })

		if (updatedQuestion) return updatedQuestion
		throw new NotAuthorizedError()
	}

	static async CreateQuestion (req: Request) {
		const isMoreThan0 = (val: number) => Validation.isMoreThan(val, 0)
		const isLongerThan2 = (val: string) => Validation.isLongerThan(val, 2)
		const isLessThan100 = (val: number) => Validation.isLessThan(val, 101)
		const isLessThan4 = (val: string[]) => Validation.isLessThan(val.length, 5)
		const isGreaterThan20 = (val: number) => Validation.isMoreThan(val, 20)

		const data = validate({
			body: req.body.body,
			subjectId: req.body.subjectId,
			coins: req.body.coin,
			tags: req.body.tags
		}, {
			body: { required: true, rules: [isLongerThan2] },
			subjectId: { required: true, rules: [] },
			coins: { required: true, rules: [isGreaterThan20, isLessThan100] },
			tags: { required: true, rules: [isMoreThan0, isLessThan4] }
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
		await MarkBestAnswer.execute({
			id: req.params.id,
			answerId: req.body.answerId,
			userId: authUserId
		})
	}

	static async DeleteQuestion (req: Request) {
		const authUserId = req.authUser!.id
		const isDeleted = await DeleteQuestion.execute({ id: req.params.id, userId: authUserId })
		if (isDeleted) return { success: isDeleted }
		throw new NotAuthorizedError()
	}
}