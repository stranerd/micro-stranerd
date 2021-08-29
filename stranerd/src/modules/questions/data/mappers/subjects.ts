import { SubjectFromModel, SubjectToModel } from '../models'
import { SubjectEntity } from '../../domain/entities/subjects'
import { BaseMapper } from '@utils/commons'

export class SubjectMapper extends BaseMapper<SubjectFromModel, SubjectToModel, SubjectEntity> {

	mapFrom (model: SubjectFromModel) {
		const { _id: id, name, createdAt, updatedAt } = model
		return new SubjectEntity({
			id, name, createdAt, updatedAt
		})
	}

	mapTo (entity: SubjectEntity): SubjectToModel {
		return {
			name: entity.name
		}
	}
}
