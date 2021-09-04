import { ChatMetaFromModel, ChatMetaToModel } from '../models/chatMeta'
import { ChatMetaEntity } from '../../domain/entities/chatMeta'
import { ChatMapper } from './chat'
import { BaseMapper } from '@utils/commons'
import { ChatFromModel } from '../models/chat'

export class ChatMetaMapper extends BaseMapper<ChatMetaFromModel, ChatMetaToModel, ChatMetaEntity> {
	chatMapper = new ChatMapper()

	mapFrom (model) {
		if (!model) return null
		const { _id, last, unRead, userBio, createdAt, updatedAt } = model
		const lastData = this.chatMapper.mapFrom(last)
		return new ChatMetaEntity({
			id: _id.toString(),
			last: lastData!,
			unRead,
			userBio,
			createdAt, updatedAt
		})
	}

	mapTo (entity) {
		return {
			last: entity.last as ChatFromModel,
			unRead: entity.unRead,
			userBio: entity.userBio
		}
	}
}
