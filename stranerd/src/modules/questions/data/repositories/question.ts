import { IQuestionRepository } from '../../domain/i-repositories/question'
import { QuestionEntity } from '../../domain/entities/question'
import { QuestionMapper } from '../mappers'
import { QuestionFromModel, QuestionToModel } from '../models/question'
import { Questions } from '../mongooseModels'
import { GetClause } from '@utils/paginator'
import { PaginateResult } from 'mongoose'
import { generatePaginateResult } from '@utils/paginator'


export class QuestionRepository implements IQuestionRepository {
	private static instance: QuestionRepository
	private mapper: QuestionMapper

	private constructor () {
		this.mapper = new QuestionMapper()
	}

	static getInstance (): QuestionRepository {
		if (!QuestionRepository.instance) QuestionRepository.instance = new QuestionRepository()
		return QuestionRepository.instance
	}

	async get (condition: GetClause): Promise<PaginateResult<QuestionEntity> | null> {

		const questions: QuestionEntity[] = []
		const questionRaw: PaginateResult<QuestionFromModel> = await Questions.paginate(condition.query,condition.options)

		if(questionRaw) {

			 const returnData = questionRaw.docs

			  returnData.forEach((data) => {
				const question: QuestionEntity = this.mapper.mapFrom(data)
				questions.push(question)
			  })

			  const finalResult: PaginateResult<QuestionEntity> = generatePaginateResult(questions,questionRaw)

			 return finalResult
			 }
		 return null
	}

	async add (data: QuestionToModel): Promise<boolean> {
		const questionData = await new Questions(data).save()
		return questionData ? true : false
	}

	async find (id: string): Promise<QuestionEntity | null> {

		const questionData = await Questions.findById(id)
		if(questionData) {
		  const question: QuestionEntity = this.mapper.mapFrom(questionData)
		  return question
		} 
		
		return null
	}

	async update (id: string, data: Partial<QuestionToModel>): Promise<boolean> {

		const questionData = await Questions.findById(id)
		if(questionData) {
		   questionData.coins = data.coins ? data.coins : questionData.coins
		   questionData.body = data.body ? data.body : questionData.body
		   questionData.tags = data.tags ? data.tags : questionData.tags
		   questionData.subjectId = data.subjectId ? data.subjectId : questionData.subjectId
		   questionData.userId = data.userId ? data.userId : questionData.userId
		   questionData.user = data.user ? data.user : questionData.user

		   return true
		} 
		
		return false
	}

	async delete (id: string): Promise<boolean> {
		const deleteData = await Questions.findOneAndDelete({_id:id})
		return deleteData ? true : false
	}
}
