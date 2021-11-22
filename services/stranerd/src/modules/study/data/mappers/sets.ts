import { SetFromModel, SetToModel } from '../models/sets'
import { SetEntity } from '../../domain/entities/sets'
import { BaseMapper } from '@utils/commons'

export class SetMapper extends BaseMapper<SetFromModel, SetToModel, SetEntity> {
	mapFrom (model: SetFromModel | null) {
		if (!model) return null
		const { _id, name, isRoot, isPublic, tags, saved, userId, userBio, createdAt, updatedAt } = model
		return new SetEntity({
			id: _id.toString(), name, isRoot, isPublic, tags, saved, userId, userBio, createdAt, updatedAt
		})
	}

	mapTo (entity: SetEntity) {
		return {
			name: entity.name,
			isRoot: entity.isRoot,
			isPublic: entity.isPublic,
			saved: entity.saved,
			tags: entity.tags,
			userId: entity.userId,
			userBio: entity.userBio
		}
	}
}
