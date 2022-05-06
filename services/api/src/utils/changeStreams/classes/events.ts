import { ChangeStreamCallbacks } from '@utils/commons'
import { EventEntity, EventFromModel, EventsUseCases } from '@modules/classes'
import { getSocketEmitter } from '@index'
import { scheduleEvent, unScheduleEvent } from '@utils/modules/classes/events'

export const EventChangeStreamCallbacks: ChangeStreamCallbacks<EventFromModel, EventEntity> = {
	created: async ({ after }) => {
		await getSocketEmitter().emitCreated(`classes/events/${after.classId}`, after)
		await getSocketEmitter().emitCreated(`classes/events/${after.classId}/${after.id}`, after)
		await scheduleEvent(after)
	},
	updated: async ({ after, before, changes }) => {
		await getSocketEmitter().emitUpdated(`classes/events/${after.classId}`, after)
		await getSocketEmitter().emitUpdated(`classes/events/${after.classId}/${after.id}`, after)

		if (changes.data) {
			await unScheduleEvent(before)
			await EventsUseCases.updateTaskIds({
				id: before.id, data: { taskIds: before.taskIds, add: false }
			})
			await scheduleEvent(after)
		}
	},
	deleted: async ({ before }) => {
		await getSocketEmitter().emitDeleted(`classes/events/${before.classId}`, before)
		await getSocketEmitter().emitDeleted(`classes/events/${before.classId}/${before.id}`, before)
		await unScheduleEvent(before)
	}
}