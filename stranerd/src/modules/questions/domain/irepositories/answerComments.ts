import { AnswerCommentToModel } from '../../data/models'
import { AnswerCommentEntity } from '../entities/answerComments'
import { QueryParams, QueryResults } from '@utils/commons'
import { UserBio } from '../types'

export interface IAnswerCommentRepository {
	add: (data: AnswerCommentToModel) => Promise<AnswerCommentEntity>
	get: (query: QueryParams) => Promise<QueryResults<AnswerCommentEntity>>
	find: (id: string) => Promise<AnswerCommentEntity | null>
	deleteAnswerComments: (answerId: string) => Promise<boolean>
	updateAnswerCommentsUserBio: (userId: string, userBio: UserBio) => Promise<boolean>
}
