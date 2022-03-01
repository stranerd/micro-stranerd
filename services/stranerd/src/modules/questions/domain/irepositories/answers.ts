import { QueryParams, QueryResults } from '@utils/commons'
import { AnswerToModel } from '../../data/models/answers'
import { AnswerEntity } from '../entities/answers'
import { UserBio, UserRoles } from '../types'

export interface IAnswerRepository {
	add: (data: AnswerToModel) => Promise<AnswerEntity>
	get: (query: QueryParams) => Promise<QueryResults<AnswerEntity>>
	find: (id: string) => Promise<AnswerEntity | null>
	update: (id: string, userId: string, data: Partial<AnswerToModel>) => Promise<AnswerEntity | null>
	delete: (id: string, userId: string) => Promise<boolean>
	updateAnswersUserBio: (userId: string, userBio: UserBio, userRoles: UserRoles) => Promise<boolean>
	deleteQuestionAnswers: (questionId: string) => Promise<boolean>
}
