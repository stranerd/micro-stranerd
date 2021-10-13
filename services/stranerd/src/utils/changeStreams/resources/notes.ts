import { ChangeStreamCallbacks, EventTypes } from '@utils/commons'
import { NoteEntity, NoteFromModel } from '@modules/resources'
import { getSocketEmitter } from '@index'
import { publishers } from '@utils/events'

export const NoteChangeStreamCallbacks: ChangeStreamCallbacks<NoteFromModel, NoteEntity> = {
	created: async ({ after }) => {
		await getSocketEmitter().emitOpenCreated('notes', after)
		await getSocketEmitter().emitOpenCreated(`notes/${after.id}`, after)
	},
	updated: async ({ after, before, changes }) => {
		await getSocketEmitter().emitOpenUpdated('notes', after)
		await getSocketEmitter().emitOpenUpdated(`notes/${after.id}`, after)

		if (changes.media && before.media) await publishers[EventTypes.DELETEFILE].publish(before.media)
	},
	deleted: async ({ before }) => {
		await getSocketEmitter().emitOpenDeleted('notes', before)
		await getSocketEmitter().emitOpenDeleted(`notes/${before.id}`, before)

		if (before.media) await publishers[EventTypes.DELETEFILE].publish(before.media)
	}
}