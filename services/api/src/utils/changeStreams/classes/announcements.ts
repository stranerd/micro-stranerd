import { AnnouncementEntity, AnnouncementFromModel, EventsUseCases, EventType } from '@modules/classes'
import { NotificationType } from '@modules/users'
import { DbChangeCallbacks } from '@utils/app/package'
import { appInstance } from '@utils/app/types'
import { sendNotification } from '@utils/modules/users/notifications'

export const AnnouncementDbChangeCallbacks: DbChangeCallbacks<AnnouncementFromModel, AnnouncementEntity> = {
	created: async ({ after }) => {
		await appInstance.listener.created(`classes/${after.classId}/announcements`, after)
		await appInstance.listener.created(`classes/${after.classId}/announcements/${after.id}`, after)

		await sendNotification(after.getAllUsers().filter((userId) => userId !== after.user.id), {
			title: 'New announcement!',
			body: after.body, sendEmail: false,
			data: { type: NotificationType.NewClassAnnouncement, classId: after.classId, announcementId: after.id }
		})

		if (after.reminder) await EventsUseCases.add({
			title: after.body, classId: after.classId, users: after.users, user: after.user,
			data: { type: EventType.oneOff, scheduledAt: after.reminder, announcementId: after.id }
		})
	},
	updated: async ({ after, before, changes }) => {
		await appInstance.listener.updated(`classes/${after.classId}/announcements`, after)
		await appInstance.listener.updated(`classes/${after.classId}/announcements/${after.id}`, after)

		if (before.reminder && (changes.reminder || changes.body)) {
			const { results } = await EventsUseCases.get({
				where: [{ field: 'data.announcementId', value: before.id }]
			})
			const event = results.at(0) ?? null
			if (event) {
				if (after.reminder) await EventsUseCases.update({
					title: after.body,
					classId: event.classId, id: event.id, userId: event.id, data: {
						// @ts-ignore
						data: { ...event.data, scheduledAt: after.reminder }
					}
				})
				else await EventsUseCases.delete({ classId: event.classId, id: event.id, userId: event.id })
			}
		}
	},
	deleted: async ({ before }) => {
		await appInstance.listener.deleted(`classes/${before.classId}/announcements`, before)
		await appInstance.listener.deleted(`classes/${before.classId}/announcements/${before.id}`, before)

		if (before.reminder) {
			const { results } = await EventsUseCases.get({
				where: [{ field: 'data.announcementId', value: before.id }]
			})
			const event = results.at(0) ?? null
			if (event) await EventsUseCases.delete({ classId: event.classId, id: event.id, userId: event.id })
		}
	}
}