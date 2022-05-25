import { FileFromModel, FileToModel } from '../models/files'
import { FileEntity } from '../../domain/entities/files'
import { BaseMapper } from '@utils/commons'

export class FileMapper extends BaseMapper<FileFromModel, FileToModel, FileEntity> {
	mapFrom (model: FileFromModel | null) {
		if (!model) return null
		const { _id, title, content, user, isPrivate, links, media, createdAt, updatedAt } = model
		return new FileEntity({
			id: _id.toString(), title, content, user,
			isPrivate, links, media, createdAt, updatedAt
		})
	}

	mapTo (entity: FileEntity) {
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
