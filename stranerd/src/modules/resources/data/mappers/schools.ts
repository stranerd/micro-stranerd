import { SchoolFromModel, SchoolToModel } from '../models/schools'
import { SchoolEntity } from '../../domain/entities/schools'
import { BaseMapper } from '@utils/commons'

export class SchoolMapper extends BaseMapper<SchoolFromModel, SchoolToModel, SchoolEntity> {
	mapFrom (model: SchoolFromModel | null) {
		if (!model) return null
		const { _id, name, createdAt, updatedAt } = model
		return new SchoolEntity({
			id: _id.toString(), name, createdAt, updatedAt
		})
	}

	mapTo (entity: SchoolEntity) {
		return {
			name: entity.name
		}
	}
}
