import { ChangeStreamCallbacks, EventTypes } from '@utils/commons'
import { ChatEntity, ChatFromModel, FindSession, GetChats } from '@modules/sessions'
import { publishers } from '@utils/events'
import { startSessionTimer } from '@utils/modules/sessions/sessions'
import { getSocketEmitter } from '@index'

export const ChatChangeStreamCallbacks: ChangeStreamCallbacks<ChatFromModel, ChatEntity> = {
	created: async ({ after }) => {
		await getSocketEmitter().emitCreated(`sessions/chats/${after.path[0]}`, after)
		await getSocketEmitter().emitCreated(`sessions/chats/${after.path[1]}`, after)
		await getSocketEmitter().emitCreated(`sessions/chats/${after.id}/${after.path[0]}`, after)
		await getSocketEmitter().emitCreated(`sessions/chats/${after.id}/${after.path[1]}`, after)
		if (!after.sessionId) return
		const session = await FindSession.execute({ sessionId: after.sessionId, userId: after.path[0] })
		if (!session || session.startedAt || session.done) return
		const sessionChats = await GetChats.execute({
			where: [{ field: 'sessionId', value: after.sessionId }, { field: 'path.0', value: session.studentId }],
			limit: 2
		})
		if (sessionChats.docs.total < 2) return
		if (sessionChats.results[1].id !== after.id) return
		await startSessionTimer(session)
	},
	updated: async ({ after }) => {
		await getSocketEmitter().emitUpdated(`sessions/chats/${after.path[0]}`, after)
		await getSocketEmitter().emitUpdated(`sessions/chats/${after.path[1]}`, after)
		await getSocketEmitter().emitUpdated(`sessions/chats/${after.id}/${after.path[0]}`, after)
		await getSocketEmitter().emitUpdated(`sessions/chats/${after.id}/${after.path[1]}`, after)
	},
	deleted: async ({ before }) => {
		await getSocketEmitter().emitDeleted(`sessions/chats/${before.path[0]}`, before)
		await getSocketEmitter().emitDeleted(`sessions/chats/${before.path[1]}`, before)
		await getSocketEmitter().emitDeleted(`sessions/chats/${before.id}/${before.path[0]}`, before)
		await getSocketEmitter().emitDeleted(`sessions/chats/${before.id}/${before.path[1]}`, before)
		if (before.media) await publishers[EventTypes.DELETEFILE].publish(before.media)
	}
}