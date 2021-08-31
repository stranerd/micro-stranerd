import { QueryParams, QueryResults } from '@utils/commons'
import { AnswerToModel } from '../../data/models/answers'
import { AnswerEntity } from '../entities/answers'

export interface IAnswerRepository {
	add: (data: AnswerToModel) => Promise<AnswerEntity>
	get: (query: QueryParams) => Promise<QueryResults<AnswerEntity>>
	find: (id: string) => Promise<AnswerEntity | null>
	update: (id: string, userId: string, data: Partial<AnswerToModel>) => Promise<AnswerEntity>
	delete: (id: string, userId: string) => Promise<boolean>
	rate: (id: string, rating: number) => Promise<boolean>
}
