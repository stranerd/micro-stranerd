import { SessionFromModel, SessionToModel } from '../models/session'
import { SessionEntity } from '../../domain/entities/session'
import { BaseMapper } from '@utils/commons'

export class SessionMapper extends BaseMapper<SessionFromModel, SessionToModel, SessionEntity> {
	mapFrom (model: SessionFromModel | null) {
		if (!model) return null
		const {
			_id, duration, price, message,
			student, tutor, accepted, done, cancelled,
			createdAt, startedAt, endedAt, updatedAt, taskIds,
			isScheduled, scheduledAt
		} = model
		return new SessionEntity({
			id: _id.toString(), message, student, tutor,
			duration, price, accepted: accepted, done, cancelled,
			createdAt, updatedAt, startedAt, endedAt, taskIds,
			isScheduled, scheduledAt
		})
	}

	mapTo (entity: SessionEntity) {
		return {
			message: entity.message,
			student: entity.student,
			tutor: entity.tutor,
			duration: entity.duration,
			price: entity.price,
			isScheduled: entity.isScheduled,
			scheduledAt: entity.scheduledAt
		}
	}
}
