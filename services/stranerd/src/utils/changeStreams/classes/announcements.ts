import { ChangeStreamCallbacks } from '@utils/commons'
import { AnnouncementEntity, AnnouncementFromModel, FindClass } from '@modules/classes'
import { getSocketEmitter } from '@index'
import { broadcastNotifications } from '@utils/modules/users/notifications'

getSocketEmitter().register('classes/announcements', getSocketEmitter().quickRegisters.isOpen)
export const AnnouncementChangeStreamCallbacks: ChangeStreamCallbacks<AnnouncementFromModel, AnnouncementEntity> = {
	created: async ({ after }) => {
		await getSocketEmitter().emitCreated('classes/announcements', after)
		await getSocketEmitter().emitCreated(`classes/announcements/${after.id}`, after)

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
		await getSocketEmitter().emitUpdated('classes/announcements', after)
		await getSocketEmitter().emitUpdated(`classes/announcements/${after.id}`, after)
	},
	deleted: async ({ before }) => {
		await getSocketEmitter().emitDeleted('classes/announcements', before)
		await getSocketEmitter().emitDeleted(`classes/announcements/${before.id}`, before)
	}
}