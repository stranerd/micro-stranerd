import { ClassFromModel, ClassToModel } from '../models/classes'
import { ClassEntity } from '../../domain/entities/classes'
import { BaseMapper } from '@utils/commons'

export class ClassMapper extends BaseMapper<ClassFromModel, ClassToModel, ClassEntity> {
	mapFrom (model: ClassFromModel | null) {
		if (!model) return null
		const {
			_id,
			user,
			name, school,
			description,
			photo,
			users,
			courses,
			requests,
			createdAt,
			updatedAt
		} = model
		return new ClassEntity({
			id: _id.toString(), user, courses,
			name, school, description, photo, users, requests,
			createdAt, updatedAt
		})
	}

	mapTo (entity: ClassEntity) {
		return {
			name: entity.name,
			school: entity.school,
			description: entity.description,
			photo: entity.photo,
			users: entity.users,
			courses: entity.courses,
			user: entity.user
		}
	}
}
