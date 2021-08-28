import { CommentToModel } from '../../data/models/comment'
import { CommentEntity } from '../entities/comment'

export interface ICommentRepository {
	add: (data: CommentToModel) => Promise<boolean>
	get: (baseId: string, commentIds?: string[]) => Promise<CommentEntity[] | null>
	find: (baseId: string, id: string) => Promise<CommentEntity | null>
	update: (baseId: string, id: string, body: string) => Promise<boolean>
}
