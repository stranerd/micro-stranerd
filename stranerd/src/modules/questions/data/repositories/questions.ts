import { IQuestionRepository } from '../../domain/irepositories/questions'
import { QuestionMapper } from '../mappers'
import { QuestionFromModel, QuestionToModel } from '../models/questions'
import { Answer, Question } from '../mongooseModels'
import { parseQueryParams, QueryParams } from '@utils/commons'
import { UserBio } from '@modules/questions/domain/types/users'

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
		const question = await Question.findOneAndUpdate({ _id: id, userId }, data, { new: true })
		return this.mapper.mapFrom(question)!
	}


	async markBestAnswer (id: string, answerId: string) {
		const question = await Question.findById(id)
		if(!question) return false
		if(question.bestAnswers.length < 1) return false
		if(question.bestAnswers.includes(answerId)) return false
		const answer = await Answer.findById(answerId)
		if(answer) {
			  answer.best = true
			  question.bestAnswers.push(answerId)
			  answer.save()
			  question.save()
		}
		return true
	}

	async modifyAnswerCount (id: string, increment: boolean) {
		const question = await Question.findById(id)
		if(!question) return false
		if(increment) question.answersCount = question.answersCount + 1
		else question.answersCount = question.answersCount - 1
		await question.save()
		return true
		
	}

	async updateQuestionUserBio (userId: string, userBio: UserBio) {
		const questions = await Question.updateMany({userId},{userBio})
		if(questions.n == 0) return false
		return true
	}

	async removeBestAnswers (id: string, answerId: string) {
		const question = await Question.findOneAndUpdate({_id: id}, { $pull: {bestAnswers: answerId }})
		if(!question) return false
		return true
	}

	async delete (id: string, userId: string) {
		const question = await Question.findOneAndDelete({ _id: id, userId })
		return !!question
	}
}
