import { SubjectFromModel, SubjectToModel } from '../models/subjects'
import { SubjectEntity } from '../../domain/entities/subjects'
import { BaseMapper } from '@utils/commons'

export class SubjectMapper extends BaseMapper<SubjectFromModel, SubjectToModel, SubjectEntity> {
	mapFrom (model: SubjectFromModel | null) {
		if (!model) return null
		const { _id, name, createdAt, updatedAt } = model
		return new SubjectEntity({
			id: _id.toString(), name, createdAt, updatedAt
		})
	}

	mapTo (entity: SubjectEntity) {
		return {
			name: entity.name
		}
	}
}
