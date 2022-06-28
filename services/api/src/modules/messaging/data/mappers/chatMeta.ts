import { ChatMetaFromModel, ChatMetaToModel } from '../models/chatMeta'
import { ChatMetaEntity } from '../../domain/entities/chatMeta'
import { ChatMapper } from './chat'
import { BaseMapper } from '@utils/commons'

export class ChatMetaMapper extends BaseMapper<ChatMetaFromModel, ChatMetaToModel, ChatMetaEntity> {
	mapFrom (model: ChatMetaFromModel | null) {
		if (!model) return null
		const { _id, last, data, members, createdAt, updatedAt, readAt } = model
		const lastData = new ChatMapper().mapFrom(last)
		return new ChatMetaEntity({
			id: _id.toString(), last: lastData!, data, members,
			createdAt, updatedAt, readAt
		})
	}

	mapTo (entity: ChatMetaEntity) {
		return {
			data: entity.data,
			members: entity.members
		}
	}
}
