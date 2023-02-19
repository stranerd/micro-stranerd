import {
	AnnouncementsUseCases,
	ClassEntity,
	ClassFromModel,
	EventsUseCases,
	GroupsUseCases,
	SchemesUseCases
} from '@modules/classes'
import { NotificationType } from '@modules/users'
import { DbChangeCallbacks } from '@utils/app/package'
import { appInstance } from '@utils/app/types'
import { publishers } from '@utils/events'
import { sendNotification } from '@utils/modules/users/notifications'

export const ClassDbChangeCallbacks: DbChangeCallbacks<ClassFromModel, ClassEntity> = {
	created: async ({ after }) => {
		await appInstance.listener.created('classes/classes', after)
		await appInstance.listener.created(`classes/classes/${after.id}`, after)
	},
	updated: async ({ after, before, changes }) => {
		await appInstance.listener.updated('classes/classes', after)
		await appInstance.listener.updated(`classes/classes/${after.id}`, after)

		if (changes.users || changes.requests) {
			await Promise.all([AnnouncementsUseCases, EventsUseCases, GroupsUseCases, EventsUseCases, SchemesUseCases].map((u) => u.updateUsers({
				classId: after.id,
				users: after.users
			})))
			const rejectedUsers = before.requests
				.filter((userId) => !after.requests.includes(userId))
				.filter((userId) => !after.getAllUsers().includes(userId))
			const removedUsers = before.getAllUsers().filter((userId) => !after.getAllUsers().includes(userId))
			const addedUsers = after.getAllUsers().filter((userId) => !before.getAllUsers().includes(userId))
			await sendNotification(rejectedUsers, {
				body: `Request to join ${after.name} cancelled/rejected`,
				data: { type: NotificationType.ClassRejected, classId: after.id },
				title: after.name, sendEmail: false
			})
			await sendNotification(removedUsers, {
				body: `You got removed from: ${after.name}`,
				data: { type: NotificationType.ClassRemoved, classId: after.id },
				title: after.name, sendEmail: false
			})
			await sendNotification(addedUsers, {
				body: `You got added to : ${after.name}`,
				data: { type: NotificationType.ClassAccepted, classId: after.id },
				title: after.name, sendEmail: false
			})
		}
		if (changes.photo && before.photo) await publishers.DELETEFILE.publish(before.photo)
	},
	deleted: async ({ before }) => {
		await appInstance.listener.deleted('classes/classes', before)
		await appInstance.listener.deleted(`classes/classes/${before.id}`, before)

		if (before.photo) await publishers.DELETEFILE.publish(before.photo)
		await Promise.all([GroupsUseCases.deleteClassGroups, AnnouncementsUseCases.deleteClassAnnouncements].map((useCase) => useCase(before.id)))
	}
}