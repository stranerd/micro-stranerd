import { DiscussionFromModel, DiscussionToModel } from '../models/discussions'
import { DiscussionEntity } from '../../domain/entities/discussions'
import { BaseMapper } from '@utils/commons'

export class DiscussionMapper extends BaseMapper<DiscussionFromModel, DiscussionToModel, DiscussionEntity> {
	mapFrom (model: DiscussionFromModel | null) {
		if (!model) return null
		const { _id, user, content, media, links, groupId, classId, createdAt, updatedAt } = model
		return new DiscussionEntity({
			id: _id.toString(), user,
			content, media, links, groupId, classId,
			createdAt, updatedAt
		})
	}

	mapTo (entity: DiscussionEntity) {
		return {
			content: entity.content,
			media: entity.media,
			links: entity.links,
			groupId: entity.groupId,
			classId: entity.classId,
			user: entity.user
		}
	}
}
