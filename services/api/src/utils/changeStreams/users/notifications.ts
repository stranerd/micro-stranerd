import { ChangeStreamCallbacks } from '@utils/commons'
import { NotificationEntity, NotificationFromModel } from '@modules/users'
import { getSocketEmitter } from '@index'
import { sendPushNotification } from '@utils/modules/push'

export const NotificationChangeStreamCallbacks: ChangeStreamCallbacks<NotificationFromModel, NotificationEntity> = {
	created: async ({ after }) => {
		await getSocketEmitter().emitCreated(`users/notifications/${after.userId}`, after)
		await getSocketEmitter().emitCreated(`users/notifications/${after.id}/${after.userId}`, after)

		await sendPushNotification({
			userIds: [after.userId],
			title: after.title, body: after.body,
			data: {
				type: 'notifications',
				data: { id: after.id, action: after.action, data: after.data }
			}
		})
	},
	updated: async ({ after }) => {
		await getSocketEmitter().emitUpdated(`users/notifications/${after.userId}`, after)
		await getSocketEmitter().emitUpdated(`users/notifications/${after.id}/${after.userId}`, after)
	},
	deleted: async ({ before }) => {
		await getSocketEmitter().emitDeleted(`users/notifications/${before.userId}`, before)
		await getSocketEmitter().emitDeleted(`users/notifications/${before.id}/${before.userId}`, before)
	}
}