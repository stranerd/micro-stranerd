import { ChangeStreamCallbacks, EventTypes } from '@utils/commons'
import {
	ClassEntity,
	ClassFromModel,
	DeleteClassAnnouncements,
	DeleteClassGroups,
	UpdateAnnouncementsUsers,
	UpdateGroupsUsers
} from '@modules/classes'
import { getSocketEmitter } from '@index'
import { publishers } from '@utils/events'
import { broadcastNotifications } from '@utils/modules/users/notifications'

export const ClassChangeStreamCallbacks: ChangeStreamCallbacks<ClassFromModel, ClassEntity> = {
	created: async ({ after }) => {
		await getSocketEmitter().emitOpenCreated('classes/classes', after)
		await getSocketEmitter().emitOpenCreated(`classes/classes/${after.id}`, after)
	},
	updated: async ({ after, before, changes }) => {
		await getSocketEmitter().emitOpenUpdated('classes/classes', after)
		await getSocketEmitter().emitOpenUpdated(`classes/classes/${after.id}`, after)

		if (changes.users) {
			await Promise.all([UpdateAnnouncementsUsers, UpdateGroupsUsers].map((u) => u.execute({
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
		await getSocketEmitter().emitOpenDeleted('classes/classes', before)
		await getSocketEmitter().emitOpenDeleted(`classes/classes/${before.id}`, before)

		if (before.photo) await publishers[EventTypes.DELETEFILE].publish(before.photo)
		if (before.coverPhoto) await publishers[EventTypes.DELETEFILE].publish(before.coverPhoto)
		await Promise.all([DeleteClassGroups, DeleteClassAnnouncements].map((useCase) => useCase.execute(before.id)))
	}
}