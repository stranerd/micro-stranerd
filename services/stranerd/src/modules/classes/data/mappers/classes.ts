import { ClassFromModel, ClassToModel } from '../models/classes'
import { ClassEntity } from '../../domain/entities/classes'
import { BaseMapper } from '@utils/commons'

export class ClassMapper extends BaseMapper<ClassFromModel, ClassToModel, ClassEntity> {
	mapFrom (model: ClassFromModel | null) {
		if (!model) return null
		const {
			_id,
			userId,
			userBio,
			userRoles,
			name,
			description,
			avatar,
			users,
			requests,
			createdAt,
			updatedAt
		} = model
		return new ClassEntity({
			id: _id.toString(), userId, userBio, userRoles,
			name, description, avatar, users, requests,
			createdAt, updatedAt
		})
	}

	mapTo (entity: ClassEntity) {
		return {
			name: entity.name,
			description: entity.description,
			avatar: entity.avatar,
			users: entity.users,
			userId: entity.userId,
			userBio: entity.userBio,
			userRoles: entity.userRoles
		}
	}
}
