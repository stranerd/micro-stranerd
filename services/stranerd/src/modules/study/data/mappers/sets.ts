import { SetFromModel, SetToModel } from '../models/sets'
import { SetEntity } from '../../domain/entities/sets'
import { BaseMapper } from '@utils/commons'

export class SetMapper extends BaseMapper<SetFromModel, SetToModel, SetEntity> {
	mapFrom (model: SetFromModel | null) {
		if (!model) return null
		const {
			_id,
			name,
			children,
			saved,
			parent,
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
			children,
			saved,
			parent,
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
			parent: entity.parent,
			userId: entity.userId,
			userBio: entity.userBio,
			userRoles: entity.userRoles,
			data: entity.data
		}
	}
}
