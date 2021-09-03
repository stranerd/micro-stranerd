import { ChatFromModel, ChatToModel } from '../models/chat'
import { ChatEntity } from '../../domain/entities/chat'

export class ChatMapper {
	mapFrom (model: ChatFromModel | null) {
		if (!model) return null
		const { _id, content, media, sessionId, from, readAt, createdAt } = model
		return new ChatEntity({
			_id,
			content, media, from, sessionId,
			createdAt,
			readAt
		})
	}

	mapTo (entity: ChatEntity): ChatToModel {
		return {
			content: entity.content,
			media: entity.media,
			from: entity.from,
			sessionId: entity.sessionId,
			readAt: entity.readAt
		}
	}

}
