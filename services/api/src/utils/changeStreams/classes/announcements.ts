import { ChangeStreamCallbacks } from '@utils/commons'
import { AnnouncementEntity, AnnouncementFromModel, ClassesUseCases } from '@modules/classes'
import { getSocketEmitter } from '@index'
import { broadcastNotifications } from '@utils/modules/users/notifications'

export const AnnouncementChangeStreamCallbacks: ChangeStreamCallbacks<AnnouncementFromModel, AnnouncementEntity> = {
	created: async ({ after }) => {
		await getSocketEmitter().emitCreated(`classes/announcements/${after.classId}`, after)
		await getSocketEmitter().emitCreated(`classes/announcements/${after.classId}/${after.id}`, after)

		const classInst = await ClassesUseCases.find(after.classId)
		if (!classInst) return
		const users = classInst.getAllUsers().filter((userId) => userId !== after.user.id)
		await broadcastNotifications(users, {
			title: `New announcement in ${classInst.name}`,
			body: after.body,
			action: 'announcements',
			data: { classId: after.classId, announcementId: after.id }
		})
	},
	updated: async ({ after }) => {
		await getSocketEmitter().emitUpdated(`classes/announcements/${after.classId}`, after)
		await getSocketEmitter().emitUpdated(`classes/announcements/${after.classId}/${after.id}`, after)
	},
	deleted: async ({ before }) => {
		await getSocketEmitter().emitDeleted(`classes/announcements/${before.classId}`, before)
		await getSocketEmitter().emitDeleted(`classes/announcements/${before.classId}/${before.id}`, before)
	}
}