import { ChatMetaEntity, ChatMetaFromModel } from '@modules/messaging'
import { ChangeStreamCallbacks } from '@utils/app/package'
import { appInstance } from '@utils/app/types'

export const ChatMetaChangeStreamCallbacks: ChangeStreamCallbacks<ChatMetaFromModel, ChatMetaEntity> = {
	created: async ({ after }) => {
		await Promise.all(after.members.map(async (userId) => {
			await appInstance.socketEmitter.emitCreated(`messaging/chatMetas/${userId}`, after)
			await appInstance.socketEmitter.emitCreated(`messaging/chatMetas/${after.id}/${userId}`, after)
		}))
	},
	updated: async ({ after }) => {
		await Promise.all(after.members.map(async (userId) => {
			await appInstance.socketEmitter.emitUpdated(`messaging/chatMetas/${userId}`, after)
			await appInstance.socketEmitter.emitUpdated(`messaging/chatMetas/${after.id}/${userId}`, after)
		}))
	},
	deleted: async ({ before }) => {
		await Promise.all(before.members.map(async (userId) => {
			await appInstance.socketEmitter.emitDeleted(`messaging/chatMetas/${userId}`, before)
			await appInstance.socketEmitter.emitDeleted(`messaging/chatMetas/${before.id}/${userId}`, before)
		}))
	}
}