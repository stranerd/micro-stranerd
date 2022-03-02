import { SetFromModel, SetToModel } from '../models/sets'
import { SetEntity } from '../../domain/entities/sets'
import { BaseMapper } from '@utils/commons'

export class SetMapper extends BaseMapper<SetFromModel, SetToModel, SetEntity> {
	mapFrom (model: SetFromModel | null) {
		if (!model) return null
		const {
			_id,
			name,
			saved,
			userId,
			userBio,
			userRoles,
			data,
			createdAt,
			updatedAt
		} = model
		return new SetEntity({
			id: _id.toString(),
			name,
			saved,
			userId,
			userBio,
			userRoles,
			data,
			createdAt,
			updatedAt
		})
	}

	mapTo (entity: SetEntity) {
		return {
			name: entity.name,
			saved: entity.saved,
			userId: entity.userId,
			userBio: entity.userBio,
			userRoles: entity.userRoles,
			data: entity.data
		}
	}
}
