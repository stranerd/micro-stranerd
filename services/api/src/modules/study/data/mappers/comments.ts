import { CommentFromModel, CommentToModel } from '../models/comments'
import { CommentEntity } from '../../domain/entities/comments'
import { BaseMapper } from '@utils/commons'

export class CommentMapper extends BaseMapper<CommentFromModel, CommentToModel, CommentEntity> {
	mapFrom (model: CommentFromModel | null) {
		if (!model) return null
		const { _id, body, userId, userBio, userRoles, data, createdAt, updatedAt } = model
		return new CommentEntity({
			id: _id.toString(), body, userId, userBio, userRoles, data, createdAt, updatedAt
		})
	}

	mapTo (entity: CommentEntity) {
		return {
			body: entity.body,
			userId: entity.userId,
			userBio: entity.userBio,
			userRoles: entity.userRoles,
			data: entity.data
		}
	}
}
