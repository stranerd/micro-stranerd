import { ChangeStreamCallbacks, EventTypes } from '@utils/commons'
import { NoteEntity, NoteFromModel, RemoveSetProp, SetSaved } from '@modules/study'
import { getSocketEmitter } from '@index'
import { publishers } from '@utils/events'
import { IncrementUserMetaCount, ScoreRewards, UpdateUserNerdScore, UserMeta } from '@modules/users'

getSocketEmitter().register('study/notes', getSocketEmitter().quickRegisters.isOpen)
export const NoteChangeStreamCallbacks: ChangeStreamCallbacks<NoteFromModel, NoteEntity> = {
	created: async ({ after }) => {
		await getSocketEmitter().emitCreated('study/notes', after)
		await getSocketEmitter().emitCreated(`study/notes/${after.id}`, after)

		await UpdateUserNerdScore.execute({
			userId: after.userId,
			amount: ScoreRewards.NewNote
		})
		await IncrementUserMetaCount.execute({ id: after.userId, value: 1, property: UserMeta.notes })
	},
	updated: async ({ after, before, changes }) => {
		await getSocketEmitter().emitUpdated('study/notes', after)
		await getSocketEmitter().emitUpdated(`study/notes/${after.id}`, after)

		if (changes.media && before.media) await publishers[EventTypes.DELETEFILE].publish(before.media)
	},
	deleted: async ({ before }) => {
		await getSocketEmitter().emitDeleted('study/notes', before)
		await getSocketEmitter().emitDeleted(`study/notes/${before.id}`, before)

		await RemoveSetProp.execute({ prop: SetSaved.notes, value: before.id })

		await UpdateUserNerdScore.execute({
			userId: before.userId,
			amount: -ScoreRewards.NewNote
		})
		await IncrementUserMetaCount.execute({ id: before.userId, value: -1, property: UserMeta.notes })

		if (before.media) await publishers[EventTypes.DELETEFILE].publish(before.media)
	}
}