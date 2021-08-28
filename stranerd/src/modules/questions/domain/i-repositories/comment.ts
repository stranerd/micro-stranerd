import { CommentToModel } from '../../data/models/comment'
import { CommentEntity } from '../entities/comment'
import { GetClause } from '@utils/paginator'
import { PaginateResult } from 'mongoose'

export interface ICommentRepository {
	add: (data: CommentToModel) => Promise<boolean>
	get: (condition: GetClause) => Promise<PaginateResult<CommentEntity> | null>
	find: (baseId: string, id: string) => Promise<CommentEntity | null>
	update: (baseId: string, id: string, body: string) => Promise<boolean>
}
