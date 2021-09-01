import { QueryParams, QueryResults } from '@utils/commons'
import { AnswerToModel } from '../../data/models/answers'
import { AnswerEntity } from '../entities/answers'
import { UserBio } from '../types/users'

export interface IAnswerRepository {
	add: (data: AnswerToModel) => Promise<AnswerEntity>
	get: (query: QueryParams) => Promise<QueryResults<AnswerEntity>>
	find: (id: string) => Promise<AnswerEntity | null>
	update: (id: string, userId: string, data: Partial<AnswerToModel>) => Promise<AnswerEntity>
	delete: (id: string, userId: string) => Promise<boolean>
	modifyCommentsCount: (id: string, increment: boolean) => Promise<boolean>
	updateAnswersUserBio: (userId: string, userBio: UserBio) => Promise<boolean>
	deleteQuestionAnswers: (questionId: string) => Promise<boolean>
	search (query: Object, limit: number) : Promise<AnswerEntity[]>
}
