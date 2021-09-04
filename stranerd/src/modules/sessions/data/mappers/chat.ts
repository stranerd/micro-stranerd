import { ChatFromModel, ChatToModel } from '../models/chat'
import { ChatEntity } from '../../domain/entities/chat'
import { BaseMapper } from '@stranerd/api-commons'

export class ChatMapper extends BaseMapper<ChatFromModel, ChatToModel, ChatEntity> {
	mapFrom (model) {
		if (!model) return null
		const { _id, path, content, media, sessionId, from, readAt, createdAt, updatedAt } = model
		return new ChatEntity({
			id: _id.toString(), path,
			content, media, from, sessionId,
			createdAt, updatedAt, readAt
		})
	}

	mapTo (entity) {
		return {
			content: entity.content,
			media: entity.media,
			from: entity.from,
			sessionId: entity.sessionId
		}
	}

	mapForMeta (model: ChatFromModel) {
		const { _id, path, content, media, sessionId, from, readAt, createdAt, updatedAt } = model
		return {
			id: _id.toString,
			path, content, media, sessionId, from, readAt, createdAt, updatedAt
		}
	}
}
