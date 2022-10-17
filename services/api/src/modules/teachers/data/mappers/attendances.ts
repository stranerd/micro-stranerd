import { AttendanceFromModel, AttendanceToModel } from '../models/attendances'
import { AttendanceEntity } from '../../domain/entities/attendances'
import { BaseMapper } from '@utils/app/package'

export class AttendanceMapper extends BaseMapper<AttendanceFromModel, AttendanceToModel, AttendanceEntity> {
	mapFrom (model: AttendanceFromModel | null) {
		if (!model) return null
		const { _id, courseId, title, user, members, attended, closedAt, createdAt, updatedAt } = model
		return new AttendanceEntity({
			id: _id.toString(), courseId, title, user, members, attended, closedAt, createdAt, updatedAt
		})
	}

	mapTo (entity: AttendanceEntity) {
		return {
			courseId: entity.courseId,
			title: entity.title,
			user: entity.user,
			members: entity.members
		}
	}
}
