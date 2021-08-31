import { AnswerCommentToModel } from '../../data/models'
import { AnswerCommentEntity } from '../entities/answerComments'
import { QueryParams, QueryResults } from '@utils/commons'

export interface IAnswerCommentRepository {
	add: (data: AnswerCommentToModel) => Promise<AnswerCommentEntity>
	get: (query: QueryParams) => Promise<QueryResults<AnswerCommentEntity>>
	find: (id: string) => Promise<AnswerCommentEntity | null>
	deleteAnswerComment: (answerId: string) => Promise<boolean>
}
