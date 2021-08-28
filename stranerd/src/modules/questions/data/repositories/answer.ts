import { IAnswerRepository } from '../../domain/i-repositories/answer'
import { AnswerMapper } from '../mappers'
import { AnswerFromModel, AnswerToModel } from '../models/answer'
import { Answers } from '../mongooseModels'
import { AnswerEntity } from '../../domain/entities'
import { User } from 'src/modules/users/data/mongooseModels/users'
import { GetClause } from '@utils/paginator'
import { PaginateResult } from 'mongoose'
import { generatePaginateResult } from '@utils/paginator'


export class AnswerRepository implements IAnswerRepository {
	private static instance: AnswerRepository
	private mapper: AnswerMapper

	private constructor () {
		this.mapper = new AnswerMapper()
	}

	static getInstance (): AnswerRepository {
		if (!AnswerRepository.instance) AnswerRepository.instance = new AnswerRepository()
		return AnswerRepository.instance
	}
	
	
	async get (condition: GetClause): Promise<PaginateResult<AnswerEntity> | null> {

		const answers: AnswerEntity[] = []
		const answersRaw: PaginateResult<AnswerFromModel> = await Answers.paginate(condition.query,condition.options)

		if(answersRaw) {

			 const returnData = answersRaw.docs

			  returnData.forEach((answerData) => {
				const answer: AnswerEntity = this.mapper.mapFrom(answerData)
				answers.push(answer)
			  })  

			 const finalResult: PaginateResult<AnswerEntity> = generatePaginateResult(answers,answersRaw)

			 return finalResult
			 }
		 return null
	}

	async add (data: AnswerToModel): Promise<boolean> {

		const answerData = await new Answers(data).save()
		return answerData ? true : false
	}

	async find (id: string): Promise<AnswerEntity | null> {
		const answerData = await Answers.findById(id)
		if(answerData) {
		  const answer: AnswerEntity = this.mapper.mapFrom(answerData)
		  return answer
		} 
		else {
			return null
		}
	}

	async update (id: string, data: Partial<AnswerToModel>): Promise<boolean>  {
		const answerData = await Answers.findById(id)
		if(answerData) {
		   answerData.title = data.title ? data.title : answerData.title
		   answerData.body = data.body ? data.body : answerData.body
		   answerData.tags = data.tags ? data.tags : answerData.tags
		   answerData.coins = data.coins ? data.coins : answerData.coins
		   answerData.subjectId = data.subjectId ? data.subjectId : answerData.subjectId
		   answerData.questionId = data.questionId ? data.questionId : answerData.questionId
		   answerData.userId = data.userId ? data.userId : answerData.userId
		   answerData.user = data.user ? data.user : answerData.user

		   return true
		} 
		
		return false
		
	}

	async delete (id: string): Promise<boolean>  {
		const deleteData = await Answers.findOneAndDelete({_id:id})
		return deleteData ? true : false
	}

	async rate (id: string, userId: string, rating: number): Promise<boolean> {
		const answerData = await Answers.findById(id)
		const userData = await User.findById(userId)
		if(answerData && userData) {
			answerData.ratings.count = answerData.ratings.count++
			answerData.ratings.total = answerData.ratings.total + rating 

			return true
		}

		return false
	}

	async markAsBestAnswer (questionId: string, answerId: string): Promise<boolean> {
		const answerData = await Answers.findOne({questionId, answerId})
		
		if(answerData) {
		  answerData.best = true
		   return true
		}

		return false
	}
}
