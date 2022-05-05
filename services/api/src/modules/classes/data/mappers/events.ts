import { EventFromModel, EventToModel } from '../models/events'
import { EventEntity } from '../../domain/entities/events'
import { BaseMapper } from '@utils/commons'

export class EventMapper extends BaseMapper<EventFromModel, EventToModel, EventEntity> {
	mapFrom (model: EventFromModel | null) {
		if (!model) return null
		const { _id, title, data, classId, userId, userBio, userRoles, users, createdAt, updatedAt } = model
		return new EventEntity({
			id: _id.toString(), title, data, classId, userId, userBio, userRoles, users, createdAt, updatedAt
		})
	}

	mapTo (entity: EventEntity) {
		return {
			title: entity.title,
			data: entity.data,
			classId: entity.classId,
			users: entity.users,
			userId: entity.userId,
			userBio: entity.userBio,
			userRoles: entity.userRoles
		}
	}
}