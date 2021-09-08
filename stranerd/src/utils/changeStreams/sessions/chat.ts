import { ChangeStreamCallbacks, EventTypes } from '@utils/commons'
import { ChatFromModel } from '@modules/sessions/data/models/chat'
import { ChatEntity } from '@modules/sessions/domain/entities/chat'
import { publishers } from '@utils/events'
import { FindSession, GetChats } from '@modules/sessions'
import { startSession } from '@utils/modules/sessions/sessions'

export const ChatChangeStreamCallbacks: ChangeStreamCallbacks<ChatFromModel, ChatEntity> = {
	created: async ({ after }) => {
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
	deleted: async ({ before }) => {
		if (before.media) await publishers[EventTypes.DELETEFILE].publish(before.media)
	}
}