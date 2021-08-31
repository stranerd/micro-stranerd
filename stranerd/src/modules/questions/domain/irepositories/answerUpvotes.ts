import { AnswerUpvoteToModel } from '../../data/models'
import { AnswerUpvoteEntity } from '../entities/answerUpvotes'
import { QueryParams, QueryResults } from '@utils/commons'

export interface IAnswerUpvoteRepository {
	add: (data: AnswerUpvoteToModel) => Promise<AnswerUpvoteEntity>
	get: (query: QueryParams) => Promise<QueryResults<AnswerUpvoteEntity>>
	find: (id: string) => Promise<AnswerUpvoteEntity | null>
}
