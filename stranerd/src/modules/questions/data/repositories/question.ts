import { IQuestionRepository } from '../../domain/i-repositories/question'
import { QuestionEntity } from '../../domain/entities/question'
import { QuestionMapper } from '../mappers'
import { QuestionFromModel, QuestionToModel } from '../models/question'
import { Questions } from '../mongooseModels'

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

	async get (baseId: string, filterType: string, questionIds?: string[]): Promise<QuestionEntity[]> {

		const questions: QuestionEntity[] = []

		if(questionIds == undefined) {

		 let questionRaw: QuestionFromModel[] | null = await Questions.find({userId: baseId})

		 if(filterType == 'subject')  questionRaw = await Questions.find({subjectId: baseId})

		 if(questionRaw) {

			 for (let index = 0; index < questionRaw.length; index++) {
				 const questionData = questionRaw[index]
				 const question: QuestionEntity = this.mapper.mapFrom(questionData)
				 questions.push(question)
			 }

		   } 

		} else { 
		
		 for (let index = 0; index < questionIds.length; index++) {
			 const questionId = questionIds[index]
			 const questionRaw: QuestionFromModel | null = await Questions.findById(questionId)
			
			 if(questionRaw) {
				 const question: QuestionEntity = this.mapper.mapFrom(questionRaw)
				 questions.push(question)
			 }
		 }
	 }
         
		 return questions
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
