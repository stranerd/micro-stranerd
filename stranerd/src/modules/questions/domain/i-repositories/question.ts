import { QuestionEntity } from '../entities/question'
import { QuestionToModel } from '../../data/models/question'
import { GetClause } from '@utils/paginator'
import { PaginateResult } from 'mongoose'

export interface IQuestionRepository {
	add: (data: QuestionToModel) => Promise<boolean>
	get: (condition: GetClause) => Promise<PaginateResult<QuestionEntity> | null>
	find: (id: string) => Promise<QuestionEntity | null>
	update: (id: string, data: Partial<QuestionToModel>) => Promise<boolean>
	delete: (id: string) => Promise<boolean>
}
