import { ChatFromModel, ChatToModel } from '../models/chat'
import { ChatEntity } from '../../domain/entities/chat'
import { BaseMapper } from '@utils/commons'

export class ChatMapper extends BaseMapper<ChatFromModel, ChatToModel, ChatEntity> {
	mapFrom (model: ChatFromModel | null) {
		if (!model) return null
		const { _id, from, to, content, media, sessionId, readAt, createdAt, updatedAt } = model
		return new ChatEntity({
			id: _id.toString(), from, to,
			content, media, sessionId,
			createdAt, updatedAt, readAt
		})
	}

	mapTo (entity: ChatEntity) {
		return {
			content: entity.content,
			from: entity.from,
			to: entity.to,
			media: entity.media,
			sessionId: entity.sessionId
		}
	}
}
