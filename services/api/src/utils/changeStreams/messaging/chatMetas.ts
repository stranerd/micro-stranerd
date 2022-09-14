import { ChangeStreamCallbacks } from '@utils/app/package'
import { ChatMetaEntity, ChatMetaFromModel } from '@modules/messaging'
import { getSocketEmitter } from '@index'

export const ChatMetaChangeStreamCallbacks: ChangeStreamCallbacks<ChatMetaFromModel, ChatMetaEntity> = {
	created: async ({ after }) => {
		await Promise.all(after.members.map(async (userId) => {
			await getSocketEmitter().emitCreated(`messaging/chatMetas/${userId}`, after)
			await getSocketEmitter().emitCreated(`messaging/chatMetas/${after.id}/${userId}`, after)
		}))
	},
	updated: async ({ after }) => {
		await Promise.all(after.members.map(async (userId) => {
			await getSocketEmitter().emitUpdated(`messaging/chatMetas/${userId}`, after)
			await getSocketEmitter().emitUpdated(`messaging/chatMetas/${after.id}/${userId}`, after)
		}))
	},
	deleted: async ({ before }) => {
		await Promise.all(before.members.map(async (userId) => {
			await getSocketEmitter().emitDeleted(`messaging/chatMetas/${userId}`, before)
			await getSocketEmitter().emitDeleted(`messaging/chatMetas/${before.id}/${userId}`, before)
		}))
	}
}