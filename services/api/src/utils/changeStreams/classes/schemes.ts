import { ChangeStreamCallbacks } from '@utils/app/package'
import { SchemeEntity, SchemeFromModel } from '@modules/classes'
import { getSocketEmitter } from '@index'
import { sendNotification } from '@utils/modules/users/notifications'
import { NotificationType } from '@modules/users'

export const SchemeChangeStreamCallbacks: ChangeStreamCallbacks<SchemeFromModel, SchemeEntity> = {
	created: async ({ after }) => {
		await getSocketEmitter().emitCreated(`classes/schemes/${after.classId}`, after)
		await getSocketEmitter().emitCreated(`classes/schemes/${after.classId}/${after.id}`, after)
		await sendNotification(after.getAllUsers(), {
			title: `${after.title} course outline updated`,
			sendEmail: false,
			body: after.topic,
			data: { type: NotificationType.ClassSchemeUpdated, classId: after.classId, title: after.title }
		})
	},
	updated: async ({ after, changes }) => {
		await getSocketEmitter().emitUpdated(`classes/schemes/${after.classId}`, after)
		await getSocketEmitter().emitUpdated(`classes/schemes/${after.classId}/${after.id}`, after)
		if (changes.title || changes.topic || changes.start || changes.end) await sendNotification(after.getAllUsers(), {
			title: `${after.title} course outline updated`,
			sendEmail: false,
			body: after.topic,
			data: { type: NotificationType.ClassSchemeUpdated, classId: after.classId, title: after.title }
		})
	},
	deleted: async ({ before }) => {
		await getSocketEmitter().emitDeleted(`classes/schemes/${before.classId}`, before)
		await getSocketEmitter().emitDeleted(`classes/schemes/${before.classId}/${before.id}`, before)
		await sendNotification(before.getAllUsers(), {
			title: `${before.title} course outline updated`,
			sendEmail: false,
			body: before.topic,
			data: { type: NotificationType.ClassSchemeUpdated, classId: before.classId, title: before.title }
		})
	}
}