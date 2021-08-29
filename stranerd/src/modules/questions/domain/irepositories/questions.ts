import { QuestionEntity } from '../entities/questions'
import { QuestionToModel } from '../../data/models/questions'
import { QueryParams, QueryResults } from '@utils/commons'

export interface IQuestionRepository {
	add: (data: QuestionToModel) => Promise<QuestionEntity>
	get: (condition: QueryParams) => Promise<QueryResults<QuestionEntity>>
	find: (id: string,userId: string | null) => Promise<QuestionEntity | null>
	update: (id: string, userId: string, data: QuestionToModel) => Promise<QuestionEntity>
	delete: (id: string, userId: string) => Promise<boolean>
}