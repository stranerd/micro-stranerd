import { FileFromModel, FileToModel } from '../models/files'
import { FileEntity } from '../../domain/entities/files'
import { BaseMapper } from '@utils/commons'

export class FileMapper extends BaseMapper<FileFromModel, FileToModel, FileEntity> {
	mapFrom (model: FileFromModel | null) {
		if (!model) return null
		const { _id, title, media, user, createdAt, updatedAt } = model
		return new FileEntity({
			id: _id.toString(), title, media, user,
			createdAt, updatedAt
		})
	}

	mapTo (entity: FileEntity) {
		return {
			title: entity.title,
			media: entity.media,
			user: entity.user
		}
	}
}
