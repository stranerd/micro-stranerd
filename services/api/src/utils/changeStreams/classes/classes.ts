import { ChangeStreamCallbacks, EventTypes } from '@utils/commons'
import {
	ClassEntity,
	ClassFromModel,
	DeleteClassAnnouncements,
	GroupsUseCases,
	UpdateAnnouncementsUsers
} from '@modules/classes'
import { getSocketEmitter } from '@index'
import { publishers } from '@utils/events'
import { broadcastNotifications } from '@utils/modules/users/notifications'

export const ClassChangeStreamCallbacks: ChangeStreamCallbacks<ClassFromModel, ClassEntity> = {
	created: async ({ after }) => {
		await getSocketEmitter().emitCreated('classes/classes', after)
		await getSocketEmitter().emitCreated(`classes/classes/${after.id}`, after)
	},
	updated: async ({ after, before, changes }) => {
		await getSocketEmitter().emitUpdated('classes/classes', after)
		await getSocketEmitter().emitUpdated(`classes/classes/${after.id}`, after)

		if (changes.users) {
			await Promise.all([UpdateAnnouncementsUsers.execute, GroupsUseCases.updateUsers].map((u) => u({
				classId: after.id,
				users: after.users
			})))
			const removedUsers = before.getAllUsers().filter((userId) => !after.getAllUsers().includes(userId))
			const addedUsers = after.getAllUsers().filter((userId) => !before.getAllUsers().includes(userId))
			await broadcastNotifications(removedUsers, {
				action: 'classes',
				body: `You either left or were removed from the class: ${after.name}`,
				data: { classId: after.id },
				title: after.name
			})
			await broadcastNotifications(addedUsers, {
				action: 'classes',
				body: `You just got added to the class: ${after.name}`,
				data: { classId: after.id },
				title: after.name
			})
		}
		if (changes.photo && before.photo) await publishers[EventTypes.DELETEFILE].publish(before.photo)
		if (changes.coverPhoto && before.coverPhoto) await publishers[EventTypes.DELETEFILE].publish(before.coverPhoto)
	},
	deleted: async ({ before }) => {
		await getSocketEmitter().emitDeleted('classes/classes', before)
		await getSocketEmitter().emitDeleted(`classes/classes/${before.id}`, before)

		if (before.photo) await publishers[EventTypes.DELETEFILE].publish(before.photo)
		if (before.coverPhoto) await publishers[EventTypes.DELETEFILE].publish(before.coverPhoto)
		await Promise.all([GroupsUseCases.deleteClassGroups, DeleteClassAnnouncements.execute].map((useCase) => useCase(before.id)))
	}
}