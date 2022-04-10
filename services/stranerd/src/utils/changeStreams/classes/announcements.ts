import { ChangeStreamCallbacks } from '@utils/commons'
import { AnnouncementEntity, AnnouncementFromModel, FindClass } from '@modules/classes'
import { getSocketEmitter } from '@index'
import { broadcastNotifications } from '@utils/modules/users/notifications'

export const AnnouncementChangeStreamCallbacks: ChangeStreamCallbacks<AnnouncementFromModel, AnnouncementEntity> = {
	created: async ({ after }) => {
		await getSocketEmitter().emitPathCreated('classes/announcements', after, after.classId)
		await getSocketEmitter().emitPathCreated('classes/announcements', after, `${after.classId}/${after.id}`)

		const classInst = await FindClass.execute(after.classId)
		if (!classInst) return
		const users = classInst.getAllUsers().filter((userId) => userId !== after.userId)
		await broadcastNotifications(users, {
			title: `New announcement in ${classInst.name}`,
			body: after.body,
			action: 'announcements',
			data: { classId: after.classId, announcementId: after.id }
		})
	},
	updated: async ({ after }) => {
		await getSocketEmitter().emitPathUpdated('classes/announcements', after, after.classId)
		await getSocketEmitter().emitPathUpdated('classes/announcements', after, `${after.classId}/${after.id}`)
	},
	deleted: async ({ before }) => {
		await getSocketEmitter().emitPathDeleted('classes/announcements', before, before.classId)
		await getSocketEmitter().emitPathDeleted('classes/announcements', before, `${before.classId}/${before.id}`)
	}
}