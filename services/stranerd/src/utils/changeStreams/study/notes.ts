import { ChangeStreamCallbacks, EventTypes } from '@utils/commons'
import { GetSets, NoteEntity, NoteFromModel, RemoveSetProp, UpdateSetProp } from '@modules/study'
import { getSocketEmitter } from '@index'
import { publishers } from '@utils/events'

export const NoteChangeStreamCallbacks: ChangeStreamCallbacks<NoteFromModel, NoteEntity> = {
	created: async ({ after }) => {
		await getSocketEmitter().emitOpenCreated('notes', after)
		await getSocketEmitter().emitOpenCreated(`notes/${after.id}`, after)

		const rootSet = (await GetSets.execute({
			where: [
				{ field: 'isRoot', value: true },
				{ field: 'userId', value: after.userId }
			]
		})).results[0]

		if (rootSet) await UpdateSetProp.execute({
			id: rootSet.id,
			prop: 'notes',
			values: [after.id],
			userId: after.userId,
			add: true
		})
	},
	updated: async ({ after, before, changes }) => {
		await getSocketEmitter().emitOpenUpdated('notes', after)
		await getSocketEmitter().emitOpenUpdated(`notes/${after.id}`, after)

		if (changes.media && before.media) await publishers[EventTypes.DELETEFILE].publish(before.media)
		if (changes.preview) await publishers[EventTypes.DELETEFILE].publish(before.preview)
	},
	deleted: async ({ before }) => {
		await getSocketEmitter().emitOpenDeleted('notes', before)
		await getSocketEmitter().emitOpenDeleted(`notes/${before.id}`, before)

		if (before.media) await publishers[EventTypes.DELETEFILE].publish(before.media)
		await publishers[EventTypes.DELETEFILE].publish(before.preview)

		await RemoveSetProp.execute({ prop: 'notes', value: before.id })
	}
}