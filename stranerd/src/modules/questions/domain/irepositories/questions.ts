import { QuestionEntity } from '../entities/questions'
import { QuestionToModel } from '../../data/models/questions'
import { QueryParams, QueryResults } from '@utils/commons'
import { UserBio } from '../types/users'

export interface IQuestionRepository {
	add: (data: QuestionToModel) => Promise<QuestionEntity>
	get: (condition: QueryParams) => Promise<QueryResults<QuestionEntity>>
	find: (id: string,userId: string | null) => Promise<QuestionEntity | null>
	update: (id: string, userId: string, data: QuestionToModel) => Promise<QuestionEntity>
	delete: (id: string, userId: string) => Promise<boolean>
	removeBestAnswers: (id: string, answerId: string) => Promise<boolean>
	updateQuestionUserBio: (userId: string, userBio: UserBio) => Promise<boolean>
	modifyAnswerCount: (id: string, increment: boolean) => Promise<boolean>
	markBestAnswer: (id: string, answerId: string) => Promise<boolean>
}