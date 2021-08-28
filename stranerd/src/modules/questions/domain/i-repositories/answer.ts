import { AnswerToModel } from '../../data/models/answer'
import { AnswerEntity } from '../entities/answer'
import { GetClause } from '@utils/paginator'
import { PaginateResult } from 'mongoose'

export interface IAnswerRepository {
	add: (data: AnswerToModel) => Promise<boolean>
	get: (condition: GetClause) => Promise<PaginateResult<AnswerEntity> | null>
	find: (id: string) => Promise<AnswerEntity | null>
	update: (id: string, data: Partial<AnswerToModel>) => Promise<boolean>
	delete: (id: string) => Promise<boolean>
	rate: (id: string, userId: string, rating: number) => Promise<boolean>
	markAsBestAnswer: (questionId: string, answerId: string) => Promise<boolean>
}
