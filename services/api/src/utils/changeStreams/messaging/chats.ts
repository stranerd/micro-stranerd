import { ChangeStreamCallbacks } from '@utils/commons'
import { EventTypes } from '@utils/types'
import { ChatEntity, ChatFromModel, ChatMetasUseCases } from '@modules/messaging'
import { publishers } from '@utils/events'
import { getSocketEmitter } from '@index'
import { sendPushNotification } from '@utils/modules/push'

export const ChatChangeStreamCallbacks: ChangeStreamCallbacks<ChatFromModel, ChatEntity> = {
	created: async ({ after }) => {
		await Promise.all(after.data.members.map(async (userId) => {
			await getSocketEmitter().emitCreated(`messaging/chats/${userId}`, after)
			await getSocketEmitter().emitCreated(`messaging/chats/${after.id}/${userId}`, after)
		}))
		const body = after.media ? 'Shared a file' : after.body
		await sendPushNotification({
			userIds: after.data.members.filter((u) => u !== after.from.id),
			title: 'New message', body: `${after.from.bio.firstName} ${after.from.bio.lastName}: ${body}`,
			data: {
				type: 'chats',
				data: { id: after.id, to: after.to, data: after.data }
			}
		})
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