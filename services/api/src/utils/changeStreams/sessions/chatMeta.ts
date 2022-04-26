import { ChangeStreamCallbacks } from '@utils/commons'
import { ChatMetaEntity, ChatMetaFromModel, UpdateChatMetaBio } from '@modules/sessions'
import { UsersUseCases } from '@modules/users'
import { getSocketEmitter } from '@index'

export const ChatMetaChangeStreamCallbacks: ChangeStreamCallbacks<ChatMetaFromModel, ChatMetaEntity> = {
	created: async ({ after }) => {
		await getSocketEmitter().emitCreated(`sessions/chatMetas/${after.userId}`, after)
		await getSocketEmitter().emitCreated(`sessions/chatMetas/${after.id}/${after.userId}`, after)
		if ((!after.userBio || !after.userRoles) && after.userId) {
			const user = await UsersUseCases.find(after.userId)
			if (user) await UpdateChatMetaBio.execute({
				id: after.id,
				userBio: user.bio,
				userRoles: user.roles
			})
		}
	},
	updated: async ({ after }) => {
		await getSocketEmitter().emitUpdated(`sessions/chatMetas/${after.userId}`, after)
		await getSocketEmitter().emitUpdated(`sessions/chatMetas/${after.id}/${after.userId}`, after)
	},
	deleted: async ({ before }) => {
		await getSocketEmitter().emitDeleted(`sessions/chatMetas/${before.userId}`, before)
		await getSocketEmitter().emitDeleted(`sessions/chatMetas/${before.id}/${before.userId}`, before)
	}
}