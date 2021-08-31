import { IQuestionRepository } from '../../domain/irepositories/questions'
import { QuestionMapper } from '../mappers'
import { QuestionFromModel, QuestionToModel } from '../models/questions'
import { Answer, Question } from '../mongooseModels'
import { mongoose, parseQueryParams, QueryParams } from '@utils/commons'
import { UserBio } from '../../domain/types/users'
import { UpdateTagsCount } from '@modules/questions'
import { addUserCoins } from '@utils/modules/users/transactions'
import { IncrementUserQuestionsCount } from '@modules/users'

export class QuestionRepository implements IQuestionRepository {
	private static instance: QuestionRepository
	private mapper: QuestionMapper

	private constructor () {
		this.mapper = new QuestionMapper()
	}

	static getInstance () {
		if (!QuestionRepository.instance) QuestionRepository.instance = new QuestionRepository()
		return QuestionRepository.instance
	}

	async get (query: QueryParams) {
		const data = await parseQueryParams<QuestionFromModel>(Question, query)

		return {
			...data,
			results: data.results.map((r) => this.mapper.mapFrom(r)!)
		}
	}

	async add (data: QuestionToModel) {
		const question = await new Question(data).save()
		return this.mapper.mapFrom(question)!
	}

	async find (id: string) {
		const question = await Question.findById(id)
		return this.mapper.mapFrom(question)
	}

	async update (id: string, userId: string, data: Partial<QuestionToModel>) {
		const question = await Question.findOneAndUpdate({ _id: id, userId }, data)
		if (question) {
			if (data.tags) {
				await UpdateTagsCount.execute({
					tagIds: question.tags,
					increment: false
				})
				await UpdateTagsCount.execute({
					tagIds: data.tags,
					increment: true
				})
			}
			const coins = data.coins - question.coins
			if (coins !== 0) await addUserCoins(question.userId,
				{ bronze: 0 - coins, gold: 0 },
				coins > 0 ? 'You paid coins to upgrade a question' : 'You got refunded coins from downgrading a question'
			)
		}
		return this.mapper.mapFrom(question)!
	}

	async markBestAnswer (id: string, answerId: string, userId: string) {
		const session = await mongoose.startSession()
		try {
			const question = await Question.findOneAndUpdate({ _id: id, userId }, {
				$addToSet: { bestAnswers: answerId }
			}, { session })
			const answer = await Answer.findByIdAndUpdate(answerId, { $set: { best: true } }, { session })
			await session.commitTransaction()
			session.endSession()
			return !!question && !!answer
		} catch (e) {
			await session.abortTransaction()
			session.endSession()
			throw e
		}
	}

	async modifyAnswersCount (id: string, increment: boolean) {
		const question = await Question.findByIdAndUpdate(id, {
			$inc: { answerCount: increment ? 1 : -1 }
		}, { new: true })
		return !!question
	}

	async updateQuestionsUserBio (userId: string, userBio: UserBio) {
		const questions = await Question.updateMany({ userId }, { userBio })
		return questions.n !== 0
	}

	async removeBestAnswer (id: string, answerId: string) {
		const question = await Question.findOneAndUpdate({ _id: id }, { $pull: { bestAnswers: answerId } }, { new: true })
		return !!question
	}

	async delete (id: string, userId: string) {
		const question = await Question.findOneAndDelete({ _id: id, userId })
		if (question) {
			await UpdateTagsCount.execute({
				tagIds: question.tags,
				increment: false
			})

			await IncrementUserQuestionsCount.execute({ id: question.userId, value: -1 })
			// TODO: remove from users question list
		}
		return !!question
	}
}
