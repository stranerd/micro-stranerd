import { ChatMetaEntity, ChatMetaFromModel } from '@modules/messaging'
import { DbChangeCallbacks } from '@utils/app/package'
import { appInstance } from '@utils/app/types'

export const ChatMetaDbChangeCallbacks: DbChangeCallbacks<ChatMetaFromModel, ChatMetaEntity> = {
	created: async ({ after }) => {
		await Promise.all(after.members.map(async (userId) => {
			await appInstance.listener.created(`messaging/chatMetas/${userId}`, after)
			await appInstance.listener.created(`messaging/chatMetas/${after.id}/${userId}`, after)
		}))
	},
	updated: async ({ after }) => {
		await Promise.all(after.members.map(async (userId) => {
			await appInstance.listener.updated(`messaging/chatMetas/${userId}`, after)
			await appInstance.listener.updated(`messaging/chatMetas/${after.id}/${userId}`, after)
		}))
	},
	deleted: async ({ before }) => {
		await Promise.all(before.members.map(async (userId) => {
			await appInstance.listener.deleted(`messaging/chatMetas/${userId}`, before)
			await appInstance.listener.deleted(`messaging/chatMetas/${before.id}/${userId}`, before)
		}))
	}
}