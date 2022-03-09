import { AuthApps, ChangeStreamCallbacks, EventTypes } from '@utils/commons'
import { NotificationEntity, NotificationFromModel } from '@modules/users'
import { getSocketEmitter } from '@index'
import { publishers } from '@utils/events'

export const NotificationChangeStreamCallbacks: ChangeStreamCallbacks<NotificationFromModel, NotificationEntity> = {
	created: async ({ after }) => {
		await getSocketEmitter().emitMineCreated('users/notifications', after, after.userId)
		await getSocketEmitter().emitMineCreated(`users/notifications/${after.id}`, after, after.userId)

		await publishers[EventTypes.PUSHNOTIFICATION].publish({
			userIds: [after.userId], app: AuthApps.Stranerd,
			title: after.title, body: after.body,
			data: {
				type: 'notifications',
				data: { id: after.id, action: after.action, data: after.data }
			}
		})
	},
	updated: async ({ after }) => {
		await getSocketEmitter().emitMineUpdated('users/notifications', after, after.userId)
		await getSocketEmitter().emitMineUpdated(`users/notifications/${after.id}`, after, after.userId)
	},
	deleted: async ({ before }) => {
		await getSocketEmitter().emitMineDeleted('users/notifications', before, before.userId)
		await getSocketEmitter().emitMineDeleted(`users/notifications/${before.id}`, before, before.userId)
	}
}