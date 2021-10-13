import { CourseFromModel, CourseToModel } from '../models/courses'
import { CourseEntity } from '../../domain/entities/courses'
import { BaseMapper } from '@utils/commons'

export class CourseMapper extends BaseMapper<CourseFromModel, CourseToModel, CourseEntity> {
	mapFrom (model: CourseFromModel | null) {
		if (!model) return null
		const { _id, name, createdAt, updatedAt } = model
		return new CourseEntity({
			id: _id.toString(), name, createdAt, updatedAt
		})
	}

	mapTo (entity: CourseEntity) {
		return {
			name: entity.name
		}
	}
}
