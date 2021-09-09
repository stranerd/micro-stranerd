import { ChatMetaFromModel, ChatMetaToModel } from '../models/chatMeta'
import { ChatMetaEntity } from '../../domain/entities/chatMeta'
import { ChatMapper } from './chat'
import { BaseMapper } from '@utils/commons'
import { ChatFromModel } from '../models/chat'

export class ChatMetaMapper extends BaseMapper<ChatMetaFromModel, ChatMetaToModel, ChatMetaEntity> {
	chatMapper = new ChatMapper()

	mapFrom (model: ChatMetaFromModel | null) {
		if (!model) return null
		const { _id, last, unRead, ownerId, userId, userBio, createdAt, updatedAt } = model
		const lastData = this.chatMapper.mapFrom(last)
		return new ChatMetaEntity({
			id: _id.toString(),
			last: lastData!,
			unRead, userId, ownerId, userBio,
			createdAt, updatedAt
		})
	}

	mapTo (entity: ChatMetaEntity) {
		return {
			last: entity.last as unknown as ChatFromModel,
			unRead: entity.unRead,
			ownerId: entity.ownerId,
			userId: entity.userId,
			userBio: entity.userBio
		}
	}
}
