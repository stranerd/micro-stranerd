import { TagFromModel, TagToModel } from '../models'
import { TagEntity } from '../../domain/entities/tags'
import { BaseMapper } from '@utils/commons'

export class TagMapper extends BaseMapper<TagFromModel, TagToModel, TagEntity> {

	mapFrom (model: TagFromModel) {
		const { _id: id, count, createdAt, updatedAt } = model
		return new TagEntity({
			id, count, createdAt, updatedAt
		})
	}

	mapTo (entity: TagEntity): TagToModel {
		return {
			count: entity.count
		}
	}
}
