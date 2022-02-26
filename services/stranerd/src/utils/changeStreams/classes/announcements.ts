import { ChangeStreamCallbacks } from '@utils/commons'
import { AnnouncementEntity, AnnouncementFromModel } from '@modules/classes'
import { getSocketEmitter } from '@index'

export const AnnouncementChangeStreamCallbacks: ChangeStreamCallbacks<AnnouncementFromModel, AnnouncementEntity> = {
	created: async ({ after }) => {
		await getSocketEmitter().emitOpenCreated('classes/announcements', after)
		await getSocketEmitter().emitOpenCreated(`classes/announcements/${after.id}`, after)
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