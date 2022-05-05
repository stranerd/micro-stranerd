import { ChangeStreamCallbacks } from '@utils/commons'
import { EventEntity, EventFromModel } from '@modules/classes'
import { getSocketEmitter } from '@index'

export const EventChangeStreamCallbacks: ChangeStreamCallbacks<EventFromModel, EventEntity> = {
	created: async ({ after }) => {
		await getSocketEmitter().emitCreated(`classes/events/${after.classId}`, after)
		await getSocketEmitter().emitCreated(`classes/events/${after.classId}/${after.id}`, after)
	},
	updated: async ({ after }) => {
		await getSocketEmitter().emitUpdated(`classes/events/${after.classId}`, after)
		await getSocketEmitter().emitUpdated(`classes/events/${after.classId}/${after.id}`, after)
	},
	deleted: async ({ before }) => {
		await getSocketEmitter().emitDeleted(`classes/events/${before.classId}`, before)
		await getSocketEmitter().emitDeleted(`classes/events/${before.classId}/${before.id}`, before)
	}
}