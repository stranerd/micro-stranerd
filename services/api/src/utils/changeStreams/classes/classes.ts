import { ChangeStreamCallbacks, EventTypes } from '@utils/commons'
import {
	AnnouncementsUseCases,
	ClassEntity,
	ClassFromModel,
	EventsUseCases,
	GroupsUseCases,
	SchemesUseCases
} from '@modules/classes'
import { getSocketEmitter } from '@index'
import { publishers } from '@utils/events'
import { sendNotification } from '@utils/modules/users/notifications'
import { NotificationType } from '@modules/users'

export const ClassChangeStreamCallbacks: ChangeStreamCallbacks<ClassFromModel, ClassEntity> = {
	created: async ({ after }) => {
		await getSocketEmitter().emitCreated('classes/classes', after)
		await getSocketEmitter().emitCreated(`classes/classes/${after.id}`, after)
	},
	updated: async ({ after, before, changes }) => {
		await getSocketEmitter().emitUpdated('classes/classes', after)
		await getSocketEmitter().emitUpdated(`classes/classes/${after.id}`, after)

		if (changes.users) {
			await Promise.all([AnnouncementsUseCases, EventsUseCases, GroupsUseCases, EventsUseCases, SchemesUseCases].map((u) => u.updateUsers({
				classId: after.id,
				users: after.users
			})))
			const removedUsers = before.getAllUsers().filter((userId) => !after.getAllUsers().includes(userId))
			const addedUsers = after.getAllUsers().filter((userId) => !before.getAllUsers().includes(userId))
			await sendNotification(removedUsers, {
				body: `You got removed from the class: ${after.name}`,
				data: { type: NotificationType.classes, classId: after.id },
				title: after.name, sendEmail: false
			})
			await sendNotification(addedUsers, {
				body: `You just got added to the class: ${after.name}`,
				data: { type: NotificationType.classes, classId: after.id },
				title: after.name, sendEmail: false
			})
		}
		if (changes.photo && before.photo) await publishers[EventTypes.DELETEFILE].publish(before.photo)
	},
	deleted: async ({ before }) => {
		await getSocketEmitter().emitDeleted('classes/classes', before)
		await getSocketEmitter().emitDeleted(`classes/classes/${before.id}`, before)

		if (before.photo) await publishers[EventTypes.DELETEFILE].publish(before.photo)
		await Promise.all([GroupsUseCases.deleteClassGroups, AnnouncementsUseCases.deleteClassAnnouncements].map((useCase) => useCase(before.id)))
	}
}