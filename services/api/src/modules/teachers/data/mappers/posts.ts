import { PostFromModel, PostToModel } from '../models/posts'
import { PostEntity } from '../../domain/entities/posts'
import { BaseMapper } from '@utils/app/package'

export class PostMapper extends BaseMapper<PostFromModel, PostToModel, PostEntity> {
	mapFrom (model: PostFromModel | null) {
		if (!model) return null
		const {
			_id, courseId, members, title, description, user,
			data, attachments, meta, createdAt, updatedAt
		} = model
		return new PostEntity({
			id: _id.toString(),
			courseId, members, title, description, user, attachments,
			data, meta, createdAt, updatedAt
		})
	}

	mapTo (entity: PostEntity) {
		return {
			courseId: entity.courseId,
			members: entity.members,
			title: entity.title,
			description: entity.description,
			data: entity.data,
			user: entity.user,
			attachments: entity.attachments
		}
	}
}
