import { ChangeStreamCallbacks, EventTypes } from '@utils/commons'
import { ChatEntity, ChatFromModel, FindSession, GetChats } from '@modules/sessions'
import { publishers } from '@utils/events'
import { startSession } from '@utils/modules/sessions/sessions'
import { getSocketEmitter } from '@index'

export const ChatChangeStreamCallbacks: ChangeStreamCallbacks<ChatFromModel, ChatEntity> = {
	created: async ({ after }) => {
		await getSocketEmitter().emitMineCreated('chats', after, after.path[0])
		await getSocketEmitter().emitMineCreated(`chats/${after.id}`, after, after.path[0])
		await getSocketEmitter().emitMineCreated('chats', after, after.path[1])
		await getSocketEmitter().emitMineCreated(`chats/${after.id}`, after, after.path[1])
		if (!after.sessionId) return
		const session = await FindSession.execute({ sessionId: after.sessionId, userId: after.path[0] })
		if (!session || session.startedAt || session.done) return
		const sessionChats = await GetChats.execute({
			where: [{ field: 'sessionId', value: after.sessionId }, { field: 'path.0', value: session.studentId }],
			limit: 2
		})
		if (sessionChats.docs.total < 2) return
		if (sessionChats.results[1].id !== after.id) return
		await startSession(session)
	},
	updated: async ({ after }) => {
		await getSocketEmitter().emitMineUpdated('chats', after, after.path[0])
		await getSocketEmitter().emitMineUpdated(`chats/${after.id}`, after, after.path[0])
		await getSocketEmitter().emitMineUpdated('chats', after, after.path[1])
		await getSocketEmitter().emitMineUpdated(`chats/${after.id}`, after, after.path[1])
	},
	deleted: async ({ before }) => {
		await getSocketEmitter().emitMineDeleted('chats', before, before.path[0])
		await getSocketEmitter().emitMineDeleted(`chats/${before.id}`, before, before.path[0])
		await getSocketEmitter().emitMineDeleted('chats', before, before.path[1])
		await getSocketEmitter().emitMineDeleted(`chats/${before.id}`, before, before.path[1])
		if (before.media) await publishers[EventTypes.DELETEFILE].publish(before.media)
	}
}