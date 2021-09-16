import { ChangeStreamCallbacks } from '@utils/commons'
import { NotificationEntity, NotificationFromModel } from '@modules/users'
import { getSocketEmitter } from '@index'

export const NotificationChangeStreamCallbacks: ChangeStreamCallbacks<NotificationFromModel, NotificationEntity> = {
	created: async ({ after }) => {
		await getSocketEmitter().emitCreated(`notifications/${after.userId}`, after)
		await getSocketEmitter().emitCreated(`notifications/${after.id}/${after.userId}`, after)
	},
	updated: async ({ after }) => {
		await getSocketEmitter().emitUpdated(`notifications/${after.userId}`, after)
		await getSocketEmitter().emitUpdated(`notifications/${after.id}/${after.userId}`, after)
	},
	deleted: async ({ before }) => {
		await getSocketEmitter().emitCreated(`notifications/${before.userId}`, before)
		await getSocketEmitter().emitCreated(`notifications/${before.id}/${before.userId}`, before)
	}
}