import { ChangeStreamCallbacks } from '@utils/commons'
import { ChatMetaEntity, ChatMetaFromModel, ChatMetasUseCases } from '@modules/sessions'
import { UsersUseCases } from '@modules/users'
import { getSocketEmitter } from '@index'

export const ChatMetaChangeStreamCallbacks: ChangeStreamCallbacks<ChatMetaFromModel, ChatMetaEntity> = {
	created: async ({ after }) => {
		await getSocketEmitter().emitCreated(`sessions/chatMetas/${after.user.id}`, after)
		await getSocketEmitter().emitCreated(`sessions/chatMetas/${after.id}/${after.user.id}`, after)
		if ((!after.user.bio || !after.user.roles) && after.user.id) {
			const user = await UsersUseCases.find(after.user.id)
			if (user) await ChatMetasUseCases.updateMetaUser({
				id: after.id,
				user: user.getEmbedded()
			})
		}
	},
	updated: async ({ after }) => {
		await getSocketEmitter().emitUpdated(`sessions/chatMetas/${after.user.id}`, after)
		await getSocketEmitter().emitUpdated(`sessions/chatMetas/${after.id}/${after.user.id}`, after)
	},
	deleted: async ({ before }) => {
		await getSocketEmitter().emitDeleted(`sessions/chatMetas/${before.user.id}`, before)
		await getSocketEmitter().emitDeleted(`sessions/chatMetas/${before.id}/${before.user.id}`, before)
	}
}