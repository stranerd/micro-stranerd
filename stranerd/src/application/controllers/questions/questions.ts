import { AddQuestion, DeleteQuestion, FindQuestion, GetQuestions, MarkBestAnswer, ModifyAnswerCount, RemoveBestAnswers, UpdateAnswerUserBio, UpdateQuestion } from '@modules/questions'
import { FindUser } from '@modules/users'
import { NotAuthorizedError, NotFoundError, QueryParams, Request, validate, Validation } from '@utils/commons'

export class QuestionController {
	static async FindQuestion (req: Request) {
		return await FindQuestion.execute({ id: req.params.id })
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

		const authUserId = req.authUser?.id

		const updatedQuestion = await UpdateQuestion.execute({ id: req.params.id, userId: authUserId, data })

		if (updatedQuestion) {
			return updatedQuestion
		}

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

		const authUserId = req.authUser?.id

		const user = await FindUser.execute(authUserId)

		if (user) {
			return await AddQuestion.execute({
				...data,
				userBio: user.bio,
				userId: req.authUser!.id
			})
		}

		throw new NotFoundError()
	}
    

	static async MarkBestAnswer (req: Request) {

		const authUserId = req.authUser?.id
		const question = await FindQuestion.execute({ id: req.params.id, userId: authUserId})

		 if(question){
			 return await MarkBestAnswer.execute({id: req.params.id, answerId: req.body.answerId})
		 }

		 throw new NotAuthorizedError()
	}


	static async ModifyAnswerCount (req: Request) {
		return await ModifyAnswerCount.execute({id: req.params.id, increment: req.body.type})
	}
  
	static async RemoveBestAnswer (req: Request) {
		return await RemoveBestAnswers.execute({id: req.params.id, answerId: req.body.answerId})
	}

	static async UpdateQuestionUserBio (req: Request) {
		const authUserId = req.authUser?.id
		return await UpdateAnswerUserBio.execute({userId: authUserId, userBio: req.body.newbio})
	}


	static async DeleteQuestion (req: Request) {
		const isDeleted = await DeleteQuestion.execute(req.params.id)

		if (isDeleted) return { success: isDeleted }
		throw new NotAuthorizedError()
	}
}