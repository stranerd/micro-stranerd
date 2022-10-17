import { CourseFromModel, CourseToModel } from '../models/courses'
import { CourseEntity } from '../../domain/entities/courses'
import { BaseMapper } from '@utils/app/package'

export class CourseMapper extends BaseMapper<CourseFromModel, CourseToModel, CourseEntity> {
	mapFrom (model: CourseFromModel | null) {
		if (!model) return null
		const { _id, title, level, user, members, createdAt, updatedAt } = model
		return new CourseEntity({
			id: _id.toString(), title, level, user, members, createdAt, updatedAt
		})
	}

	mapTo (entity: CourseEntity) {
		return {
			title: entity.title,
			level: entity.level,
			user: entity.user,
			members: entity.members
		}
	}
}
