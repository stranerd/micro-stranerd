import { SchemeFromModel, SchemeToModel } from '../models/schemes'
import { SchemeEntity } from '../../domain/entities/schemes'
import { BaseMapper } from '@utils/app/package'

export class SchemeMapper extends BaseMapper<SchemeFromModel, SchemeToModel, SchemeEntity> {
	mapFrom (model: SchemeFromModel | null) {
		if (!model) return null
		const { _id, title, topic, start, end, classId, user, users, readAt, createdAt, updatedAt } = model
		return new SchemeEntity({
			id: _id.toString(), title, topic, start, end, classId, user, users, readAt, createdAt, updatedAt
		})
	}

	mapTo (entity: SchemeEntity) {
		return {
			title: entity.title,
			topic: entity.topic,
			start: entity.start,
			end: entity.end,
			classId: entity.classId,
			users: entity.users,
			user: entity.user
		}
	}
}
