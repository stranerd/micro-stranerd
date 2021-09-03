import { ChatMetaFromModel, ChatMetaToModel } from '../models/chatMeta'
import { ChatMetaEntity } from '../../domain/entities/chatMeta'
import { ChatMapper } from './chat'

export class ChatMetaMapper {
	chatMapper = new ChatMapper()

	mapFrom (model: ChatMetaFromModel | null) {
		if (!model) return null
		const { _id: id, last, unRead, userBio } = model
		const lastData = this.chatMapper.mapFrom(last)
		if(lastData == null) return null
		return new ChatMetaEntity({
			id,
			last : lastData,
			unRead,
			userBio
		})
	}

	mapTo (entity: ChatMetaEntity): ChatMetaToModel {
		return {
			last: entity.last,
			unRead: entity.unRead,
			userBio: entity.userBio
		}
	}
}
