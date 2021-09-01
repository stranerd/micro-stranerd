import { IQuestionRepository } from '../../domain/irepositories/questions'
import { QuestionMapper } from '../mappers'
import { QuestionFromModel, QuestionToModel } from '../models/questions'
import { Answer, Question } from '../mongooseModels'
import { mongoose, parseQueryParams, QueryParams } from '@utils/commons'
import { UserBio } from '../../domain/types/users'
import { QuestionEntity } from '@modules/questions/domain/entities'

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


	async search (query: Object,limit: number): Promise<QuestionEntity[]> {
       
		let result: QuestionEntity[] = []
  
		 await Question.find(query)
		 .limit(limit)
		 .exec((err, data) => { 
			 if(err) result = []
			 else result = data.map((u) => this.mapper.mapFrom(u)!)
		  })
  
		 return result	
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
		return !!question
	}
}
