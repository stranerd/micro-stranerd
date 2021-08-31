import { AddAnswer, DeleteAnswer, DeletQuestionAnswers, FindAnswer, FindQuestion, GetAnswers, ModifyCommentCount, UpdateAnswer, UpdateAnswerUserBio } from '@modules/questions'
import { FindUser } from '@modules/users'
import { NotAuthorizedError, NotFoundError, QueryParams, Request, validate, Validation } from '@utils/commons'

export class AnswerController {
	static async FindAnswer (req: Request) {
		return await FindAnswer.execute(req.params.id)
	}

	static async GetAnswers (req: Request) {
		const query = req.body as QueryParams
		return await GetAnswers.execute(query)
	}

	static async UpdateAnswer (req: Request) {
		const isLongerThan2 = (val: string) => Validation.isLongerThan(val, 2)

		const data = validate({
			title: req.body.title,
			body: req.body.body
		}, {
			title: { required: true, rules: [isLongerThan2] },
			body: { required: true, rules: [] }
		})

		const authUserId = req.authUser?.id!

		const updatedAnswer = await UpdateAnswer.execute({ id: req.params.id, userId: authUserId, data })

		if (updatedAnswer) {
			return updatedAnswer
		}

		throw new NotAuthorizedError()
	}

	static async CreateAnswer (req: Request) {
		const isLongerThan2 = (val: string) => Validation.isLongerThan(val, 2)

		const data = validate({
			title: req.body.title,
			body: req.body.body,
			questionId: req.body.questionId
		}, {
			title: { required: true, rules: [isLongerThan2] },
			body: { required: true, rules: [] },
			questionId: { required: true, rules: [] }
		})

		const authUserId = req.authUser!.id

		const user = await FindUser.execute(authUserId)
		const questionData = await FindQuestion.execute(req.body.questionId)

		if (user && questionData) {
			return await AddAnswer.execute({
				...data,
				coins: questionData.creditable,
				userBio: user.bio,
				userId: req.authUser!.id
			})
		}

		throw new NotFoundError()
	}

	static async ModifyCommentCount (req: Request) {
		return await ModifyCommentCount.execute({id: req.params.id, increment: req.body.type})
	}

	static async UpdateUserBio (req: Request) {
		const authUserId = req.authUser?.id
		return await UpdateAnswerUserBio.execute({userId: authUserId, userBio: req.body.newbio})
	}

	static async DeleteQuestionAnswers (req: Request) {
		return await DeletQuestionAnswers.execute({questionId: req.params.questionId})
	}

	static async DeleteAnswer (req: Request) {
		const isDeleted = await DeleteAnswer.execute({ id: req.params.id, userId: req.authUser!.id })

		if (isDeleted) return { success: isDeleted }
		throw new NotAuthorizedError()
	}
}