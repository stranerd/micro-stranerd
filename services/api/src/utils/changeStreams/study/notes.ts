import { ChangeStreamCallbacks, EventTypes } from '@utils/commons'
import { NoteEntity, NoteFromModel, SetSaved, SetsUseCases } from '@modules/study'
import { getSocketEmitter } from '@index'
import { publishers } from '@utils/events'
import { ScoreRewards, UserMeta, UsersUseCases } from '@modules/users'

export const NoteChangeStreamCallbacks: ChangeStreamCallbacks<NoteFromModel, NoteEntity> = {
	created: async ({ after }) => {
		await getSocketEmitter().emitCreated('study/notes', after)
		await getSocketEmitter().emitCreated(`study/notes/${after.id}`, after)

		await UsersUseCases.updateNerdScore({
			userId: after.userId,
			amount: ScoreRewards.NewNote
		})
		await UsersUseCases.incrementMeta({ id: after.userId, value: 1, property: UserMeta.notes })
	},
	updated: async ({ after, before, changes }) => {
		await getSocketEmitter().emitUpdated('study/notes', after)
		await getSocketEmitter().emitUpdated(`study/notes/${after.id}`, after)

		if (changes.media && before.media) await publishers[EventTypes.DELETEFILE].publish(before.media)
	},
	deleted: async ({ before }) => {
		await getSocketEmitter().emitDeleted('study/notes', before)
		await getSocketEmitter().emitDeleted(`study/notes/${before.id}`, before)

		await SetsUseCases.removeSetProp({ prop: SetSaved.notes, value: before.id })

		await UsersUseCases.updateNerdScore({
			userId: before.userId,
			amount: -ScoreRewards.NewNote
		})
		await UsersUseCases.incrementMeta({ id: before.userId, value: -1, property: UserMeta.notes })

		if (before.media) await publishers[EventTypes.DELETEFILE].publish(before.media)
	}
}