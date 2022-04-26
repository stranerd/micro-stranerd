import { NoteFromModel, NoteToModel } from '../models/notes'
import { NoteEntity } from '../../domain/entities/notes'
import { BaseMapper } from '@utils/commons'

export class NoteMapper extends BaseMapper<NoteFromModel, NoteToModel, NoteEntity> {
	mapFrom (model: NoteFromModel | null) {
		if (!model) return null
		const {
			_id, title, description, userId, userBio, userRoles, isHosted, link, media,
			createdAt, updatedAt
		} = model
		return new NoteEntity({
			id: _id.toString(), title, description, userId, userBio, userRoles,
			isHosted, link, media, createdAt, updatedAt
		})
	}

	mapTo (entity: NoteEntity) {
		return {
			title: entity.title,
			description: entity.description,
			userId: entity.userId,
			userBio: entity.userBio,
			userRoles: entity.userRoles,
			isHosted: entity.isHosted,
			link: entity.link,
			media: entity.media
		}
	}
}