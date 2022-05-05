import { FlashCardFromModel, FlashCardToModel } from '../models/flashCards'
import { FlashCardEntity } from '../../domain/entities/flashCards'
import { BaseMapper } from '@utils/commons'

export class FlashCardMapper extends BaseMapper<FlashCardFromModel, FlashCardToModel, FlashCardEntity> {
	mapFrom (model: FlashCardFromModel | null) {
		if (!model) return null
		const { _id, title, set, user, createdAt, updatedAt } = model
		return new FlashCardEntity({
			id: _id.toString(), title, set, user, createdAt, updatedAt
		})
	}

	mapTo (entity: FlashCardEntity) {
		return {
			title: entity.title,
			set: entity.set,
			user: entity.user
		}
	}
}
