import { SchemeEntity, SchemeFromModel } from '@modules/classes'
import { NotificationType } from '@modules/users'
import { ChangeStreamCallbacks } from '@utils/app/package'
import { appInstance } from '@utils/app/types'
import { sendNotification } from '@utils/modules/users/notifications'

export const SchemeChangeStreamCallbacks: ChangeStreamCallbacks<SchemeFromModel, SchemeEntity> = {
	created: async ({ after }) => {
		await appInstance.socketEmitter.emitCreated(`classes/${after.classId}/schemes`, after)
		await appInstance.socketEmitter.emitCreated(`classes/${after.classId}/schemes/${after.id}`, after)
		await sendNotification(after.getAllUsers(), {
			title: `${after.title} course outline updated`,
			sendEmail: false,
			body: after.topic,
			data: { type: NotificationType.ClassSchemeUpdated, classId: after.classId, title: after.title }
		})
	},
	updated: async ({ after, changes }) => {
		await appInstance.socketEmitter.emitUpdated(`classes/${after.classId}/schemes`, after)
		await appInstance.socketEmitter.emitUpdated(`classes/${after.classId}/schemes/${after.id}`, after)
		if (changes.title || changes.topic || changes.start || changes.end) await sendNotification(after.getAllUsers(), {
			title: `${after.title} course outline updated`,
			sendEmail: false,
			body: after.topic,
			data: { type: NotificationType.ClassSchemeUpdated, classId: after.classId, title: after.title }
		})
	},
	deleted: async ({ before }) => {
		await appInstance.socketEmitter.emitDeleted(`classes/${before.classId}/schemes`, before)
		await appInstance.socketEmitter.emitDeleted(`classes/${before.classId}/schemes/${before.id}`, before)
		await sendNotification(before.getAllUsers(), {
			title: `${before.title} course outline updated`,
			sendEmail: false,
			body: before.topic,
			data: { type: NotificationType.ClassSchemeUpdated, classId: before.classId, title: before.title }
		})
	}
}