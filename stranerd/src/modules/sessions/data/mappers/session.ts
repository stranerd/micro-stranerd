import { SessionFromModel, SessionToModel } from '../models/session'
import { SessionEntity } from '../../domain/entities/session'
import { BaseMapper } from '@utils/commons'

export class SessionMapper extends BaseMapper<SessionFromModel, SessionToModel, SessionEntity> {
	mapFrom (model) {
		if (!model) return null
		const {
			_id, duration, price, message,
			studentId, tutorId, studentBio, tutorBio,
			accepted, done, cancelled, reviews,
			createdAt, endedAt, updatedAt
		} = model
		return new SessionEntity({
			id: _id.toString(), message, studentId, tutorId, studentBio, tutorBio,
			duration, price, accepted: accepted ?? false, done, cancelled, reviews,
			createdAt, updatedAt, endedAt
		})
	}

	mapTo (entity) {
		return {
			message: entity.message,
			studentId: entity.studentId,
			studentBio: entity.studentBio,
			tutorId: entity.tutorId,
			tutorBio: entity.tutorBio,
			duration: entity.duration,
			price: entity.price
		}
	}
}
