import { NoteFromModel, NoteToModel } from '../models/notes'
import { NoteEntity } from '../../domain/entities/notes'
import { BaseMapper } from '@utils/app/package'

export class NoteMapper extends BaseMapper<NoteFromModel, NoteToModel, NoteEntity> {
	mapFrom (model: NoteFromModel | null) {
		if (!model) return null
		const { _id, title, content, user, isPrivate, links, createdAt, updatedAt } = model
		return new NoteEntity({
			id: _id.toString(), title, content, user,
			isPrivate, links, createdAt, updatedAt
		})
	}

	mapTo (entity: NoteEntity) {
		return {
			title: entity.title,
			content: entity.content,
			user: entity.user,
			isPrivate: entity.isPrivate,
			links: entity.links
		}
	}
}
