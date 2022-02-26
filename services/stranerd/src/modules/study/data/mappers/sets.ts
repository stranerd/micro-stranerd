import { SetFromModel, SetToModel } from '../models/sets'
import { SetEntity } from '../../domain/entities/sets'
import { BaseMapper } from '@utils/commons'

export class SetMapper extends BaseMapper<SetFromModel, SetToModel, SetEntity> {
	mapFrom (model: SetFromModel | null) {
		if (!model) return null
		const {
			_id,
			name,
			isPublic,
			children,
			tags,
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
			isPublic,
			children,
			tags,
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
			isPublic: entity.isPublic,
			saved: entity.saved,
			tags: entity.tags,
			parent: entity.parent,
			userId: entity.userId,
			userBio: entity.userBio,
			userRoles: entity.userRoles,
			data: entity.data
		}
	}
}
