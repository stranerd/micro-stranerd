import { timestampToMs } from '@utils/commons'
import { CommentFromModel, CommentToModel } from '../models'
import { CommentEntity } from '../../domain/entities/comment'
import { BaseMapper } from '@stranerd/api-commons'

export class CommentMapper extends BaseMapper<CommentFromModel, CommentToModel, CommentEntity>  {
	mapFrom (model: CommentFromModel) {
		const {
			_id: id, body, userId, user, baseId,
			dates: { createdAt }
		} = model
		return new CommentEntity({
			id, body, userId, user, baseId,
			createdAt: timestampToMs(createdAt)
		})
	}

	mapTo (entity: CommentEntity): CommentToModel {
		return {
			body: entity.body,
			userId: entity.userId,
			user: entity.user,
			baseId: entity.baseId
		}
	}
}
