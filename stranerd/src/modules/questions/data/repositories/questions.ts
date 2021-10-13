import { IQuestionRepository } from '../../domain/irepositories/questions'
import { QuestionMapper } from '../mappers'
import { QuestionFromModel, QuestionToModel } from '../models/questions'
import { Answer, Question } from '../mongooseModels'
import { mongoose, parseQueryParams, QueryParams } from '@utils/commons'
import { UserBio } from '../../domain/types'

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
		const question = await Question.findOneAndUpdate({ _id: id, userId }, { $set: data })
		return this.mapper.mapFrom(question)
	}

	async updateBestAnswer (id: string, answerId: string, userId: string, add: boolean) {
		const session = await mongoose.startSession()
		let res = null as any
		await session.withTransaction(async (session) => {
			const question = await Question.findOneAndUpdate({
				_id: id, userId,
				...(add ? { 'bestAnswers.2': { $exists: false } } : { 'bestAnswers': answerId })
			}, {
				[add ? '$addToSet' : 'pull']: { bestAnswers: answerId }
			}, { session, new: true })
			const answer = question ? await Answer.findByIdAndUpdate(answerId, { $set: { best: add } }, {
				session,
				new: true
			}) : null
			res = !!question && !!answer
			return res
		})
		await session.endSession()
		return res
	}

	async modifyAnswers (id: string, answerId: string, userId: string, add: boolean) {
		const question = await Question.findByIdAndUpdate(id, {
			[add ? '$addToSet' : '$pull']: { answers: { id: answerId, userId } }
		}, { new: true })
		return !!question
	}

	async updateQuestionsUserBio (userId: string, userBio: UserBio) {
		const questions = await Question.updateMany({ userId }, { $set: { userBio } })
		return questions.acknowledged
	}

	async delete (id: string, userId: string) {
		const question = await Question.findOneAndDelete({ _id: id, userId })
		return !!question
	}
}
