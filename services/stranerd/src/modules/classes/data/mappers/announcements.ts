import { AnnouncementFromModel, AnnouncementToModel } from '../models/announcements'
import { AnnouncementEntity } from '../../domain/entities/announcements'
import { BaseMapper } from '@utils/commons'

export class AnnouncementMapper extends BaseMapper<AnnouncementFromModel, AnnouncementToModel, AnnouncementEntity> {
	mapFrom (model: AnnouncementFromModel | null) {
		if (!model) return null
		const { _id, users, classId, userId, userBio, userRoles, body, createdAt, updatedAt } = model
		return new AnnouncementEntity({
			id: _id.toString(), users, classId, userId, userBio, userRoles,
			body, createdAt, updatedAt
		})
	}

	mapTo (entity: AnnouncementEntity) {
		return {
			body: entity.body,
			classId: entity.classId,
			users: entity.users,
			userId: entity.userId,
			userBio: entity.userBio,
			userRoles: entity.userRoles
		}
	}
}
