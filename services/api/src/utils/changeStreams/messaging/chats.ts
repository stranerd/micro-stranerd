import { ChangeStreamCallbacks, EventTypes } from '@utils/commons'
import { ChatEntity, ChatFromModel, ChatMetasUseCases } from '@modules/messaging'
import { publishers } from '@utils/events'
import { getSocketEmitter } from '@index'

export const ChatChangeStreamCallbacks: ChangeStreamCallbacks<ChatFromModel, ChatEntity> = {
	created: async ({ after }) => {
		await Promise.all(after.data.members.map(async (userId) => {
			await getSocketEmitter().emitCreated(`messaging/chats/${userId}`, after)
			await getSocketEmitter().emitCreated(`messaging/chats/${after.id}/${userId}`, after)
		}))
	},
	updated: async ({ after, before, changes }) => {
		await Promise.all(after.data.members.map(async (userId) => {
			await getSocketEmitter().emitUpdated(`messaging/chats/${userId}`, after)
			await getSocketEmitter().emitUpdated(`messaging/chats/${after.id}/${userId}`, after)
		}))
		await ChatMetasUseCases.updateLastChat({ ...after, _id: after.id, id: undefined } as any)
		if (changes.media && before.media) await publishers[EventTypes.DELETEFILE].publish(before.media)
	},
	deleted: async ({ before }) => {
		await Promise.all(before.data.members.map(async (userId) => {
			await getSocketEmitter().emitDeleted(`messaging/chats/${userId}`, before)
			await getSocketEmitter().emitDeleted(`messaging/chats/${before.id}/${userId}`, before)
		}))
		if (before.media) await publishers[EventTypes.DELETEFILE].publish(before.media)
	}
}