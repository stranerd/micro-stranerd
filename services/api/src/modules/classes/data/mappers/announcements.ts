import { AnnouncementFromModel, AnnouncementToModel } from '../models/announcements'
import { AnnouncementEntity } from '../../domain/entities/announcements'
import { BaseMapper } from '@utils/commons'

export class AnnouncementMapper extends BaseMapper<AnnouncementFromModel, AnnouncementToModel, AnnouncementEntity> {
	mapFrom (model: AnnouncementFromModel | null) {
		if (!model) return null
		const { _id, users, classId, reminder, user, body, readAt, createdAt, updatedAt } = model
		return new AnnouncementEntity({
			id: _id.toString(), users, classId, reminder, user,
			body, readAt, createdAt, updatedAt
		})
	}

	mapTo (entity: AnnouncementEntity) {
		return {
			body: entity.body,
			classId: entity.classId,
			reminder: entity.reminder,
			users: entity.users,
			user: entity.user
		}
	}
}
