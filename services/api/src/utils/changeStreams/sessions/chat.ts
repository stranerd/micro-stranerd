import { ChangeStreamCallbacks, EventTypes } from '@utils/commons'
import { ChatEntity, ChatFromModel, ChatsUseCases, SessionsUseCases } from '@modules/sessions'
import { publishers } from '@utils/events'
import { startSessionTimer } from '@utils/modules/sessions/sessions'
import { getSocketEmitter } from '@index'

export const ChatChangeStreamCallbacks: ChangeStreamCallbacks<ChatFromModel, ChatEntity> = {
	created: async ({ after }) => {
		await getSocketEmitter().emitCreated(`sessions/chats/${after.from}`, after)
		await getSocketEmitter().emitCreated(`sessions/chats/${after.to}`, after)
		await getSocketEmitter().emitCreated(`sessions/chats/${after.id}/${after.from}`, after)
		await getSocketEmitter().emitCreated(`sessions/chats/${after.id}/${after.to}`, after)
		if (!after.sessionId) return
		const session = await SessionsUseCases.find({ sessionId: after.sessionId, userId: after.from })
		if (!session || session.startedAt || session.done) return
		const sessionChats = await ChatsUseCases.get({
			where: [{ field: 'sessionId', value: after.sessionId }, { field: 'from', value: session.studentId }],
			limit: 2
		})
		if (sessionChats.docs.total < 2) return
		if (sessionChats.results[1].id !== after.id) return
		await startSessionTimer(session)
	},
	updated: async ({ after }) => {
		await getSocketEmitter().emitUpdated(`sessions/chats/${after.from}`, after)
		await getSocketEmitter().emitUpdated(`sessions/chats/${after.to}`, after)
		await getSocketEmitter().emitUpdated(`sessions/chats/${after.id}/${after.from}`, after)
		await getSocketEmitter().emitUpdated(`sessions/chats/${after.id}/${after.to}`, after)
	},
	deleted: async ({ before }) => {
		await getSocketEmitter().emitDeleted(`sessions/chats/${before.from}`, before)
		await getSocketEmitter().emitDeleted(`sessions/chats/${before.to}`, before)
		await getSocketEmitter().emitDeleted(`sessions/chats/${before.id}/${before.from}`, before)
		await getSocketEmitter().emitDeleted(`sessions/chats/${before.id}/${before.to}`, before)
		if (before.media) await publishers[EventTypes.DELETEFILE].publish(before.media)
	}
}