import { timestampToMs } from '@utils/commons'
import { SubjectFromModel, SubjectToModel } from '../models'
import { SubjectEntity } from '../../domain/entities/subject'
import { BaseMapper } from '@stranerd/api-commons'

export class SubjectMapper extends BaseMapper<SubjectFromModel,SubjectToModel,SubjectEntity> {

	mapFrom (model: SubjectFromModel) {
		const { _id: id, name, dates: { createdAt } } = model
		return new SubjectEntity({
			id, name, createdAt: timestampToMs(createdAt)
		})
	}

	mapTo (entity: SubjectEntity): SubjectToModel {
		return {
			name: entity.name
		}
	}
}
