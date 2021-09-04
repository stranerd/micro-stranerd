import { ChangeStreamCallbacks, EventTypes } from '@utils/commons'
import { ChatFromModel } from '@modules/sessions/data/models/chat'
import { ChatEntity } from '@modules/sessions/domain/entities/chat'
import { publishers } from '@utils/events'

export const ChatChangeStreamCallbacks: ChangeStreamCallbacks<ChatFromModel, ChatEntity> = {
	deleted: async ({ before }) => {
		if (before.media) await publishers[EventTypes.DELETEFILE].publish(before.media)
	}
}