import { SetFromModel, SetToModel } from '../models/sets'
import { SetEntity } from '../../domain/entities/sets'
import { BaseMapper } from '@utils/commons'

export class SetMapper extends BaseMapper<SetFromModel, SetToModel, SetEntity> {
	mapFrom (model: SetFromModel | null) {
		if (!model) return null
		const { _id, name, saved, user, createdAt, updatedAt } = model
		return new SetEntity({
			id: _id.toString(), name, saved, user, createdAt, updatedAt
		})
	}

	mapTo (entity: SetEntity) {
		return {
			name: entity.name,
			saved: entity.saved,
			user: entity.user
		}
	}
}
