import { NoteFromModel, NoteToModel } from '../models/notes'
import { NoteEntity } from '../../domain/entities/notes'
import { BaseMapper } from '@utils/commons'

export class NoteMapper extends BaseMapper<NoteFromModel, NoteToModel, NoteEntity> {
	mapFrom (model: NoteFromModel | null) {
		if (!model) return null
		const {
			_id, title, description, tags, userId, userBio, isHosted, link, media,
			createdAt, updatedAt, preview
		} = model
		return new NoteEntity({
			id: _id.toString(), title, description, tags, userId, userBio,
			isHosted, link, media, createdAt, updatedAt, preview
		})
	}

	mapTo (entity: NoteEntity) {
		return {
			title: entity.title,
			description: entity.description,
			tags: entity.tags,
			userId: entity.userId,
			userBio: entity.userBio,
			isHosted: entity.isHosted,
			link: entity.link,
			media: entity.media,
			preview: entity.preview
		}
	}
}
