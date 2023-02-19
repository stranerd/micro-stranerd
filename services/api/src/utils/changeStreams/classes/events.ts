import { EventEntity, EventFromModel, EventsUseCases, EventType } from '@modules/classes'
import { NotificationType } from '@modules/users'
import { DbChangeCallbacks } from '@utils/app/package'
import { appInstance } from '@utils/app/types'
import { scheduleEvent, unScheduleEvent } from '@utils/modules/classes/events'
import { sendNotification } from '@utils/modules/users/notifications'

export const EventDbChangeCallbacks: DbChangeCallbacks<EventFromModel, EventEntity> = {
	created: async ({ after }) => {
		await appInstance.listener.created(`classes/${after.classId}/events`, after)
		await appInstance.listener.created(`classes/${after.classId}/events/${after.id}`, after)
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
		await appInstance.listener.updated(`classes/${after.classId}/events`, after)
		await appInstance.listener.updated(`classes/${after.classId}/events/${after.id}`, after)

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
		await appInstance.listener.deleted(`classes/${before.classId}/events`, before)
		await appInstance.listener.deleted(`classes/${before.classId}/events/${before.id}`, before)
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