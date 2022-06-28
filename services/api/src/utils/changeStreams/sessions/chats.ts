import { ChangeStreamCallbacks, EventTypes } from '@utils/commons'
import { ChatEntity, ChatFromModel, ChatMetasUseCases } from '@modules/sessions'
import { publishers } from '@utils/events'
import { getSocketEmitter } from '@index'

export const ChatChangeStreamCallbacks: ChangeStreamCallbacks<ChatFromModel, ChatEntity> = {
	created: async ({ after }) => {
		await getSocketEmitter().emitCreated(`sessions/chats/${after.from.id}`, after)
		await getSocketEmitter().emitCreated(`sessions/chats/${after.to}`, after)
		await getSocketEmitter().emitCreated(`sessions/chats/${after.id}/${after.from.id}`, after)
		await getSocketEmitter().emitCreated(`sessions/chats/${after.id}/${after.to}`, after)
	},
	updated: async ({ after, before, changes }) => {
		await getSocketEmitter().emitUpdated(`sessions/chats/${after.from.id}`, after)
		await getSocketEmitter().emitUpdated(`sessions/chats/${after.to}`, after)
		await getSocketEmitter().emitUpdated(`sessions/chats/${after.id}/${after.from.id}`, after)
		await getSocketEmitter().emitUpdated(`sessions/chats/${after.id}/${after.to}`, after)
		await ChatMetasUseCases.updateLastChat({ ...after, _id: after.id, id: undefined } as any)
		if (changes.media && before.media) await publishers[EventTypes.DELETEFILE].publish(before.media)
	},
	deleted: async ({ before }) => {
		await getSocketEmitter().emitDeleted(`sessions/chats/${before.from.id}`, before)
		await getSocketEmitter().emitDeleted(`sessions/chats/${before.to}`, before)
		await getSocketEmitter().emitDeleted(`sessions/chats/${before.id}/${before.from.id}`, before)
		await getSocketEmitter().emitDeleted(`sessions/chats/${before.id}/${before.to}`, before)
		if (before.media) await publishers[EventTypes.DELETEFILE].publish(before.media)
	}
}