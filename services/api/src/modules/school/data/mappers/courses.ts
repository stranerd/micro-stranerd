import { CourseFromModel, CourseToModel } from '../models/courses'
import { CourseEntity } from '../../domain/entities/courses'
import { BaseMapper } from '@utils/app/package'

export class CourseMapper extends BaseMapper<CourseFromModel, CourseToModel, CourseEntity> {
	mapFrom (model: CourseFromModel | null) {
		if (!model) return null
		const { _id, name, institutionId, facultyId, departmentId, createdAt, updatedAt } = model
		return new CourseEntity({
			id: _id.toString(), name, institutionId, facultyId, departmentId, createdAt, updatedAt
		})
	}

	mapTo (entity: CourseEntity) {
		return {
			name: entity.name,
			institutionId: entity.institutionId,
			facultyId: entity.facultyId,
			departmentId: entity.departmentId
		}
	}
}
