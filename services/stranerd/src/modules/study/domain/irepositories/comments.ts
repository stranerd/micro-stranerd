import { CommentToModel } from '../../data/models/comments'
import { CommentEntity } from '../entities/comments'
import { QueryParams, QueryResults } from '@utils/commons'
import { UserBio } from '../types'

export interface ICommentRepository {
	add: (data: CommentToModel) => Promise<CommentEntity>
	get: (query: QueryParams) => Promise<QueryResults<CommentEntity>>
	find: (id: string) => Promise<CommentEntity | null>
	deletePropertyComments: (property: keyof Omit<CommentToModel['data'], 'type'>, propertyId: string) => Promise<boolean>
	updateCommentsUserBio: (userId: string, userBio: UserBio) => Promise<boolean>
}
