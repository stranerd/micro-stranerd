import { QueryParams, QueryResults } from '@utils/commons'
import { AnswerToModel } from '../../data/models/answers'
import { AnswerEntity } from '../entities/answers'
import { UserBio } from '../types/users'

export interface IAnswerRepository {
	add: (data: AnswerToModel) => Promise<AnswerEntity>
	get: (query: QueryParams) => Promise<QueryResults<AnswerEntity>>
	find: (id: string) => Promise<AnswerEntity | null>
	update: (id: string, userId: string, data: AnswerToModel) => Promise<AnswerEntity>
	delete: (id: string, userId: string) => Promise<boolean>
	rate: (id: string, rating: number) => Promise<boolean>
	modifyCommentCount: (id: string, increment: boolean) => Promise<boolean>
	updateAnswerUserBio: (userId: string, userBio: UserBio) => Promise<boolean>
	deleteQuestionAnswers: (questionId: string) => Promise<boolean>
}
