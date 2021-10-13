import { BaseMapper } from '@utils/commons'
import { BadgeEntity } from '../../domain/entities/badges'
import { BadgeFromModel, BadgeToModel } from '../models/badges'

export class BadgeMapper extends BaseMapper<BadgeFromModel, BadgeToModel, BadgeEntity> {
	mapFrom (param: BadgeFromModel | null) {
		return !param ? null : new BadgeEntity({
			id: param._id.toString(),
			userId: param.userId,
			data: param.data,
			badges: param.badges,
			createdAt: param.createdAt,
			updatedAt: param.updatedAt
		})
	}

	mapTo (param: BadgeEntity) {
		return {
			data: param.data,
			badges: param.badges,
			userId: param.userId
		}
	}
}