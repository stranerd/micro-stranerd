import { FlashCardFromModel, FlashCardToModel } from '../models/flashCards'
import { FlashCardEntity } from '../../domain/entities/flashCards'
import { BaseMapper } from '@utils/commons'

export class FlashCardMapper extends BaseMapper<FlashCardFromModel, FlashCardToModel, FlashCardEntity> {
	mapFrom (model: FlashCardFromModel | null) {
		if (!model) return null
		const {
			_id, title, set, userId, userBio, userRoles,
			createdAt, updatedAt
		} = model
		return new FlashCardEntity({
			id: _id.toString(), title, set, userId, userBio, userRoles,
			createdAt, updatedAt
		})
	}

	mapTo (entity: FlashCardEntity) {
		return {
			title: entity.title,
			set: entity.set,
			userId: entity.userId,
			userBio: entity.userBio,
			userRoles: entity.userRoles
		}
	}
}
