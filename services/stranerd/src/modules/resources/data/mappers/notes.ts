import { NoteFromModel, NoteToModel } from '../models/notes'
import { NoteEntity } from '../../domain/entities/notes'
import { BaseMapper } from '@utils/commons'

export class NoteMapper extends BaseMapper<NoteFromModel, NoteToModel, NoteEntity> {
	mapFrom (model: NoteFromModel | null) {
		if (!model) return null
		const {
			_id, title, tags, userId, userBio, isHosted, link, media, institutionId, courseId,
			createdAt, updatedAt
		} = model
		return new NoteEntity({
			id: _id.toString(), title, tags, userId, userBio,
			isHosted, link, media, institutionId, courseId,
			createdAt, updatedAt
		})
	}

	mapTo (entity: NoteEntity) {
		return {
			title: entity.title,
			tags: entity.tags,
			institutionId: entity.institutionId,
			courseId: entity.courseId,
			userId: entity.userId,
			userBio: entity.userBio,
			isHosted: entity.isHosted,
			link: entity.link,
			media: entity.media
		}
	}
}
