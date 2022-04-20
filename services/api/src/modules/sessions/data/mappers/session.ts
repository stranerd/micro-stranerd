import { SessionFromModel, SessionToModel } from '../models/session'
import { SessionEntity } from '../../domain/entities/session'
import { BaseMapper } from '@utils/commons'

export class SessionMapper extends BaseMapper<SessionFromModel, SessionToModel, SessionEntity> {
	mapFrom (model: SessionFromModel | null) {
		if (!model) return null
		const {
			_id, duration, price, message,
			studentId, tutorId, studentBio, tutorBio, studentRoles, tutorRoles,
			accepted, done, cancelled,
			createdAt, startedAt, endedAt, updatedAt, taskIds,
			isScheduled, scheduledAt
		} = model
		return new SessionEntity({
			id: _id.toString(), message, studentId, tutorId, studentBio, tutorBio,
			duration, price, accepted: accepted, done, cancelled, studentRoles, tutorRoles,
			createdAt, updatedAt, startedAt, endedAt, taskIds,
			isScheduled, scheduledAt
		})
	}

	mapTo (entity: SessionEntity) {
		return {
			message: entity.message,
			studentId: entity.studentId,
			studentBio: entity.studentBio,
			studentRoles: entity.studentRoles,
			tutorId: entity.tutorId,
			tutorBio: entity.tutorBio,
			tutorRoles: entity.tutorRoles,
			duration: entity.duration,
			price: entity.price,
			isScheduled: entity.isScheduled,
			scheduledAt: entity.scheduledAt
		}
	}
}
