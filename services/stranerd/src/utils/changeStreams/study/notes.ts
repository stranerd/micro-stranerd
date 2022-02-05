import { ChangeStreamCallbacks, EventTypes } from '@utils/commons'
import { NoteEntity, NoteFromModel, RemoveSetProp, SetSaved } from '@modules/study'
import { getSocketEmitter } from '@index'
import { publishers } from '@utils/events'
import { IncrementUserMetaCount, ScoreRewards, UpdateUserNerdScore, UserMeta } from '@modules/users'

export const NoteChangeStreamCallbacks: ChangeStreamCallbacks<NoteFromModel, NoteEntity> = {
	created: async ({ after }) => {
		await getSocketEmitter().emitOpenCreated('notes', after)
		await getSocketEmitter().emitOpenCreated(`notes/${after.id}`, after)

		await UpdateUserNerdScore.execute({
			userId: after.userId,
			amount: ScoreRewards.NewNote
		})
		await IncrementUserMetaCount.execute({ id: after.userId, value: 1, property: UserMeta.notes })
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

		await RemoveSetProp.execute({ prop: SetSaved.notes, value: before.id })

		await UpdateUserNerdScore.execute({
			userId: before.userId,
			amount: -ScoreRewards.NewNote
		})
		await IncrementUserMetaCount.execute({ id: before.userId, value: -1, property: UserMeta.notes })

		if (before.media) await publishers[EventTypes.DELETEFILE].publish(before.media)
		await publishers[EventTypes.DELETEFILE].publish(before.preview)
	}
}