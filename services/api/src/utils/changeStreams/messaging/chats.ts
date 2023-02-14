import { ChatEntity, ChatFromModel, ChatMetasUseCases } from '@modules/messaging'
import { ChangeStreamCallbacks } from '@utils/app/package'
import { appInstance } from '@utils/app/types'
import { publishers } from '@utils/events'
import { sendPushNotification } from '@utils/modules/push'

export const ChatChangeStreamCallbacks: ChangeStreamCallbacks<ChatFromModel, ChatEntity> = {
	created: async ({ after }) => {
		await Promise.all(after.data.members.map(async (userId) => {
			await appInstance.listener.created(`messaging/chats/${userId}`, after)
			await appInstance.listener.created(`messaging/chats/${after.id}/${userId}`, after)
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
			await appInstance.listener.updated(`messaging/chats/${userId}`, after)
			await appInstance.listener.updated(`messaging/chats/${after.id}/${userId}`, after)
		}))
		await ChatMetasUseCases.updateLastChat({ ...after, _id: after.id, id: undefined } as any)
		if (changes.media && before.media) await publishers.DELETEFILE.publish(before.media)
	},
	deleted: async ({ before }) => {
		await Promise.all(before.data.members.map(async (userId) => {
			await appInstance.listener.deleted(`messaging/chats/${userId}`, before)
			await appInstance.listener.deleted(`messaging/chats/${before.id}/${userId}`, before)
		}))
		if (before.media) await publishers.DELETEFILE.publish(before.media)
	}
}