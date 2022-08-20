import { ChangeStreamCallbacks } from '@utils/commons'
import { EventEntity, EventFromModel, EventsUseCases, EventType } from '@modules/classes'
import { getSocketEmitter } from '@index'
import { scheduleEvent, unScheduleEvent } from '@utils/modules/classes/events'
import { sendNotification } from '@utils/modules/users/notifications'
import { NotificationType } from '@modules/users'

export const EventChangeStreamCallbacks: ChangeStreamCallbacks<EventFromModel, EventEntity> = {
	created: async ({ after }) => {
		await getSocketEmitter().emitCreated(`classes/events/${after.classId}`, after)
		await getSocketEmitter().emitCreated(`classes/events/${after.classId}/${after.id}`, after)
		await scheduleEvent(after)
		if (after.data.type === EventType.timetable) await sendNotification(after.getAllUsers(), {
			title: `${after.title} timetable updated`,
			sendEmail: false,
			body: after.title,
			data: {
				type: NotificationType.ClassTimetableUpdated,
				classId: after.classId,
				lecturer: after.data.lecturer,
				title: after.title
			}
		})
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

		if (after.data.type === EventType.timetable && (changes.title || changes.data)) await sendNotification(after.getAllUsers(), {
			title: `${after.title} timetable updated`,
			sendEmail: false,
			body: after.title,
			data: {
				type: NotificationType.ClassTimetableUpdated,
				classId: after.classId,
				lecturer: after.data.lecturer,
				title: after.title
			}
		})
	},
	deleted: async ({ before }) => {
		await getSocketEmitter().emitDeleted(`classes/events/${before.classId}`, before)
		await getSocketEmitter().emitDeleted(`classes/events/${before.classId}/${before.id}`, before)
		await unScheduleEvent(before)
		if (before.data.type === EventType.timetable) await sendNotification(before.getAllUsers(), {
			title: `${before.title} timetable updated`,
			sendEmail: false,
			body: before.title,
			data: {
				type: NotificationType.ClassTimetableUpdated,
				classId: before.classId,
				lecturer: before.data.lecturer,
				title: before.title
			}
		})
	}
}