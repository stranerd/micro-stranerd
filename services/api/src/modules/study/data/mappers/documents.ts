import { DocumentFromModel, DocumentToModel } from '../models/documents'
import { DocumentEntity } from '../../domain/entities/documents'
import { BaseMapper } from '@utils/commons'

export class DocumentMapper extends BaseMapper<DocumentFromModel, DocumentToModel, DocumentEntity> {
	mapFrom (model: DocumentFromModel | null) {
		if (!model) return null
		const { _id, title, content, user, isPrivate, links, media, createdAt, updatedAt } = model
		return new DocumentEntity({
			id: _id.toString(), title, content, user,
			isPrivate, links, media, createdAt, updatedAt
		})
	}

	mapTo (entity: DocumentEntity) {
		return {
			title: entity.title,
			content: entity.content,
			user: entity.user,
			isPrivate: entity.isPrivate,
			links: entity.links,
			media: entity.media
		}
	}
}
