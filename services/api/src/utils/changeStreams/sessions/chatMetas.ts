import { ChangeStreamCallbacks } from '@utils/commons'
import { ChatMetaEntity, ChatMetaFromModel } from '@modules/sessions'
import { getSocketEmitter } from '@index'

export const ChatMetaChangeStreamCallbacks: ChangeStreamCallbacks<ChatMetaFromModel, ChatMetaEntity> = {
	created: async ({ after }) => {
		await Promise.all(after.members.map(async (userId) => {
			await getSocketEmitter().emitCreated(`sessions/chatMetas/${userId}`, after)
			await getSocketEmitter().emitCreated(`sessions/chatMetas/${after.id}/${userId}`, after)
		}))
	},
	updated: async ({ after }) => {
		await Promise.all(after.members.map(async (userId) => {
			await getSocketEmitter().emitCreated(`sessions/chatMetas/${userId}`, after)
			await getSocketEmitter().emitCreated(`sessions/chatMetas/${after.id}/${userId}`, after)
		}))
	},
	deleted: async ({ before }) => {
		await Promise.all(before.members.map(async (userId) => {
			await getSocketEmitter().emitCreated(`sessions/chatMetas/${userId}`, before)
			await getSocketEmitter().emitCreated(`sessions/chatMetas/${before.id}/${userId}`, before)
		}))
	}
}