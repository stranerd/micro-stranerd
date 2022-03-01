import { FlashCardFromModel, FlashCardToModel } from '../models/flashCards'
import { FlashCardEntity } from '../../domain/entities/flashCards'
import { BaseMapper } from '@utils/commons'

export class FlashCardMapper extends BaseMapper<FlashCardFromModel, FlashCardToModel, FlashCardEntity> {
	mapFrom (model: FlashCardFromModel | null) {
		if (!model) return null
		const {
			_id, title, isPublic, set, userId, userBio, userRoles,
			createdAt, updatedAt
		} = model
		return new FlashCardEntity({
			id: _id.toString(), title, isPublic, set, userId, userBio, userRoles,
			createdAt, updatedAt
		})
	}

	mapTo (entity: FlashCardEntity) {
		return {
			title: entity.title,
			isPublic: entity.isPublic,
			set: entity.set,
			userId: entity.userId,
			userBio: entity.userBio,
			userRoles: entity.userRoles
		}
	}
}
