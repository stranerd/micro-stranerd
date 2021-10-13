import { TagFromModel, TagToModel } from '../models/tags'
import { TagEntity } from '../../domain/entities/tags'
import { BaseMapper } from '@utils/commons'

export class TagMapper extends BaseMapper<TagFromModel, TagToModel, TagEntity> {
	mapFrom (model: TagFromModel | null) {
		if (!model) return null
		const { _id, name, count, createdAt, updatedAt } = model
		return new TagEntity({
			id: _id.toString(), name, count, createdAt, updatedAt
		})
	}

	mapTo (entity: TagEntity) {
		return {
			name: entity.name,
			count: entity.count
		}
	}
}
