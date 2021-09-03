import { SessionFromModel, SessionToModel } from '../models/session'
import { SessionEntity } from '../../domain/entities/session'

export class SessionMapper {
	mapFrom (model: SessionFromModel | null) {
		if (!model) return null
		const {
			_id: id, duration, price, message,
			studentId, tutorId, studentBio, tutorBio,
			accepted, done, cancelled, reviews,
			createdAt, endedAt
		} = model
		return new SessionEntity({
			id, message, studentId, tutorId, studentBio, tutorBio,
			duration, price, accepted, done, cancelled, reviews,
			createdAt,
			endedAt
		})
	}

	mapTo (entity: SessionEntity): SessionToModel {
		return {
			message: entity.message,
			studentId: entity.studentId,
			studentBio: entity.studentBio,
			tutorId: entity.tutorId,
			tutorBio: entity.tutorBio,
			duration: entity.duration,
			price: entity.price,
			accepted: entity.accepted,
			done: entity.done,
			cancelled: entity.cancelled,
			reviews: entity.reviews
		}
	}
}
