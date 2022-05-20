import { ChangeStreamCallbacks } from '@utils/commons'
import { AnnouncementEntity, AnnouncementFromModel, ClassesUseCases, EventsUseCases, EventType } from '@modules/classes'
import { getSocketEmitter } from '@index'
import { sendNotification } from '@utils/modules/users/notifications'

export const AnnouncementChangeStreamCallbacks: ChangeStreamCallbacks<AnnouncementFromModel, AnnouncementEntity> = {
	created: async ({ after }) => {
		await getSocketEmitter().emitCreated(`classes/announcements/${after.classId}`, after)
		await getSocketEmitter().emitCreated(`classes/announcements/${after.classId}/${after.id}`, after)

		const classInst = await ClassesUseCases.find(after.classId)
		if (!classInst) return
		const users = classInst.getAllUsers().filter((userId) => userId !== after.user.id)
		await sendNotification(users, {
			title: `New announcement in ${classInst.name}`,
			body: after.body,
			action: 'announcements', sendEmail: false,
			data: { classId: after.classId, announcementId: after.id }
		})

		if (after.reminder) await EventsUseCases.add({
			title: after.body, classId: after.classId, users: after.users, user: after.user,
			data: { type: EventType.oneOff, scheduledAt: after.reminder, announcementId: after.id }
		})
	},
	updated: async ({ after, before, changes }) => {
		await getSocketEmitter().emitUpdated(`classes/announcements/${after.classId}`, after)
		await getSocketEmitter().emitUpdated(`classes/announcements/${after.classId}/${after.id}`, after)

		if (before.reminder && (changes.reminder || changes.body)) {
			const { results } = await EventsUseCases.get({
				where: [{ field: 'data.announcementId', value: before.id }]
			})
			const event = results[0] ?? null
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
		await getSocketEmitter().emitDeleted(`classes/announcements/${before.classId}`, before)
		await getSocketEmitter().emitDeleted(`classes/announcements/${before.classId}/${before.id}`, before)

		if (before.reminder) {
			const { results } = await EventsUseCases.get({
				where: [{ field: 'data.announcementId', value: before.id }]
			})
			const event = results[0] ?? null
			if (event) await EventsUseCases.delete({ classId: event.classId, id: event.id, userId: event.id })
		}
	}
}