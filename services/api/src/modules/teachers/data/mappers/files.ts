import { FileFromModel, FileToModel } from '../models/files'
import { FileEntity } from '../../domain/entities/files'
import { BaseMapper } from '@utils/app/package'

export class FileMapper extends BaseMapper<FileFromModel, FileToModel, FileEntity> {
	mapFrom (model: FileFromModel | null) {
		if (!model) return null
		const { _id, courseId, title, media, user, members, createdAt, updatedAt } = model
		return new FileEntity({
			id: _id.toString(), courseId, title, media, user, members, createdAt, updatedAt
		})
	}

	mapTo (entity: FileEntity) {
		return {
			courseId: entity.courseId,
			title: entity.title,
			media: entity.media,
			user: entity.user,
			members: entity.members
		}
	}
}
