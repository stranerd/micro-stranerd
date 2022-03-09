import { ChangeStreamCallbacks } from '@utils/commons'
import { AnnouncementEntity, AnnouncementFromModel, FindClass } from '@modules/classes'
import { getSocketEmitter } from '@index'
import { broadcastNotifications } from '@utils/modules/users/notifications'

export const AnnouncementChangeStreamCallbacks: ChangeStreamCallbacks<AnnouncementFromModel, AnnouncementEntity> = {
	created: async ({ after }) => {
		await getSocketEmitter().emitOpenCreated('classes/announcements', after)
		await getSocketEmitter().emitOpenCreated(`classes/announcements/${after.id}`, after)

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
		await getSocketEmitter().emitOpenUpdated('classes/announcements', after)
		await getSocketEmitter().emitOpenUpdated(`classes/announcements/${after.id}`, after)
	},
	deleted: async ({ before }) => {
		await getSocketEmitter().emitOpenDeleted('classes/announcements', before)
		await getSocketEmitter().emitOpenDeleted(`classes/announcements/${before.id}`, before)
	}
}