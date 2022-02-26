import { ChangeStreamCallbacks } from '@utils/commons'
import { ChatMetaEntity, ChatMetaFromModel, UpdateChatMetaBio } from '@modules/sessions'
import { FindUser } from '@modules/users'
import { getSocketEmitter } from '@index'

export const ChatMetaChangeStreamCallbacks: ChangeStreamCallbacks<ChatMetaFromModel, ChatMetaEntity> = {
	created: async ({ after }) => {
		await getSocketEmitter().emitMineCreated('sessions/chatMetas', after, after.userId)
		await getSocketEmitter().emitMineCreated(`sessions/chatMetas/${after.id}`, after, after.userId)
		if ((!after.userBio || !after.userRoles) && after.userId) {
			const user = await FindUser.execute(after.userId)
			if (user) await UpdateChatMetaBio.execute({
				id: after.id,
				userBio: user.bio,
				userRoles: user.roles
			})
		}
	},
	updated: async ({ after }) => {
		await getSocketEmitter().emitMineUpdated('sessions/chatMetas', after, after.userId)
		await getSocketEmitter().emitMineUpdated(`sessions/chatMetas/${after.id}`, after, after.userId)
	},
	deleted: async ({ before }) => {
		await getSocketEmitter().emitMineDeleted('sessions/chatMetas', before, before.userId)
		await getSocketEmitter().emitMineDeleted(`sessions/chatMetas/${before.id}`, before, before.userId)
	}
}