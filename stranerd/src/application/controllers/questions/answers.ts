import { AddAnswer, DeleteAnswer, FindAnswer, FindQuestion, GetAnswers, MarkAsBestAnswer, RateAnswer, UpdateAnswer} from '@modules/questions'
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

		const isLongerThan2 = (val: string) => Validation.isLongerThan(val,2)
	
		const data = validate({
			title: req.body.title,
			body: req.body.body,
			questionId: req.body.coin
		}, {
			title: { required: true, rules: [isLongerThan2] },
			body: { required: true, rules: [] },
			questionId: { required: true, rules: [] }
		})

		const authUserId = req.authUser?.id

		const updatedAnswer = await UpdateAnswer.execute({id: req.params.id,userId: authUserId,data})

		if(updatedAnswer){
			return updatedAnswer
		}

		throw new NotAuthorizedError()
		
	}

	static async CreateQuestion (req: Request) {
		const isLongerThan2 = (val: string) => Validation.isLongerThan(val,2)
	
		const data = validate({
			title: req.body.title,
			body: req.body.body,
			questionId: req.body.questionId
		}, {
			title: { required: true, rules: [isLongerThan2] },
			body: { required: true, rules: [] },
			questionId: { required: true, rules: [] }
		})

		const authUserId = req.authUser?.id

		const user = await FindUser.execute(authUserId)
		const questionData = await FindQuestion.execute(req.body.questionId)

		if(user && questionData){
			return await AddAnswer.execute({
				...data,
				coins: questionData.coins,
				userBio: user.bio,
				userId: req.authUser!.id
			})
		}

		throw new NotFoundError()

	}

	static async DeleteAnswer (req: Request) {
		const isDeleted = await DeleteAnswer.execute(req.params.id)

		if (isDeleted) return {success: isDeleted}
		throw new NotAuthorizedError()
	}

	static async MarkAnswerAsBest (req: Request) {
		
		const data = validate({
			questionId: req.body.questionId,
			answerId: req.body.answerId
		}, {
			answerId: { required: true, rules: [] },
			questionId: { required: true, rules: [] }
		})

		const authUserId = req.authUser?.id

		const questionData = await FindQuestion.execute({id:data.questionId,userId: authUserId})

		if(!questionData) throw new NotAuthorizedError()
		
		const isMarked = await MarkAsBestAnswer.execute(data)

		if(isMarked) return {success: isMarked}

		throw new NotFoundError()
	}

	static async RateAnswer (req: Request) {

		const data = validate({
			id: req.body.id,
			rating: req.body.rating
		}, {
			id: { required: true, rules: [] },
			rating: { required: true, rules: [] }
		})
		
		const isRated = await RateAnswer.execute(data)

		if(isRated) return {success: isRated}

		throw new NotFoundError()
	}
	
}