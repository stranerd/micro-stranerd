import { IQuestionRepository } from '../../domain/irepositories/questions'
import { QuestionMapper } from '../mappers'
import { QuestionFromModel, QuestionToModel } from '../models/questions'
import { Question } from '../mongooseModels'
import { parseQueryParams, QueryParams } from '@utils/commons'

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

	async find (id: string, userId: string | null) {
		
		 if(userId) {
			 const question = await Question.findOne({_id: id,userId})
			 return this.mapper.mapFrom(question)
		 } 
		 else  {
			const question = await Question.findById(id)
			return this.mapper.mapFrom(question)
		 }
		
	}

	async update (id: string, userId: string, data: QuestionToModel) {
		const question = await Question.findOneAndUpdate({ _id: id, userId }, data, { new: true })
		return this.mapper.mapFrom(question)!
	}

	async delete (id: string, userId: string) {
		const question = await Question.findOneAndDelete({ _id: id, userId })
		return !!question
	}
}
