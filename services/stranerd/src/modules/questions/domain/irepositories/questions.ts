import { QuestionEntity } from '../entities/questions'
import { QuestionToModel } from '../../data/models/questions'
import { QueryParams, QueryResults } from '@utils/commons'
import { UserBio } from '../types'

export interface IQuestionRepository {
	add: (data: QuestionToModel) => Promise<QuestionEntity>
	get: (condition: QueryParams) => Promise<QueryResults<QuestionEntity>>
	find: (id: string) => Promise<QuestionEntity | null>
	update: (id: string, userId: string, data: Partial<QuestionToModel>) => Promise<QuestionEntity | null>
	delete: (id: string, userId: string) => Promise<boolean>
	updateQuestionsUserBio: (userId: string, userBio: UserBio) => Promise<boolean>
	updateAnswers: (id: string, answerId: string, userId: string, add: boolean) => Promise<boolean>
	updateBestAnswer: (id: string, answerId: string, userId: string, add: boolean) => Promise<boolean>
}