import { TagFromModel, TagToModel } from '../models'
import { TagEntity } from '../../domain/entities/tag'
import { BaseMapper } from '@stranerd/api-commons'

export class TagMapper extends BaseMapper<TagFromModel, TagToModel, TagEntity> {

	mapFrom (model: TagFromModel) {
		const { _id: id, count } = model
		return new TagEntity({
			id, count
		})
	}

	mapTo (entity: TagEntity): TagToModel {
		return {
			count: entity.count
		}
	}
}
