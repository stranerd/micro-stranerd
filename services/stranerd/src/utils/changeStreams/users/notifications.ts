import { ChangeStreamCallbacks } from '@utils/commons'
import { NotificationEntity, NotificationFromModel } from '@modules/users'
import { getSocketEmitter } from '@index'

export const NotificationChangeStreamCallbacks: ChangeStreamCallbacks<NotificationFromModel, NotificationEntity> = {
	created: async ({ after }) => {
		await getSocketEmitter().emitMineCreated('notifications', after, after.userId)
		await getSocketEmitter().emitMineCreated(`notifications/${after.id}`, after, after.userId)
	},
	updated: async ({ after }) => {
		await getSocketEmitter().emitMineUpdated('notifications', after, after.userId)
		await getSocketEmitter().emitMineUpdated(`notifications/${after.id}`, after, after.userId)
	},
	deleted: async ({ before }) => {
		await getSocketEmitter().emitMineDeleted('notifications', before, before.userId)
		await getSocketEmitter().emitMineDeleted(`notifications/${before.id}`, before, before.userId)
	}
}