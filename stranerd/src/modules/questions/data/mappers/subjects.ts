import { SubjectFromModel, SubjectToModel } from '../models'
import { SubjectEntity } from '../../domain/entities/subjects'
import { BaseMapper } from '@utils/commons'

export class SubjectMapper extends BaseMapper<SubjectFromModel, SubjectToModel, SubjectEntity> {

	mapFrom (model) {
		if (!model) return null
		const { _id: id, name, createdAt, updatedAt } = model
		return new SubjectEntity({
			id, name, createdAt, updatedAt
		})
	}

	mapTo (entity) {
		return {
			name: entity.name
		}
	}
}
