import { BaseMapper } from '@utils/commons'
import { NotificationEntity } from '../../domain/entities/notifications'
import { NotificationFromModel, NotificationToModel } from '../models/notifications'

export class NotificationMapper extends BaseMapper<NotificationFromModel, NotificationToModel, NotificationEntity> {
	mapFrom (param) {
		return !param ? null : new NotificationEntity({
			id: param._id.toString(),
			body: param.body,
			action: param.action,
			userId: param.userId,
			seen: param.seen,
			createdAt: param.createdAt,
			updatedAt: param.updatedAt
		})
	}

	mapTo (param) {
		return {
			body: param.body,
			action: param.action,
			userId: param.userId
		}
	}
}