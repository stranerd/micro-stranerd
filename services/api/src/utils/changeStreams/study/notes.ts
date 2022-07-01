import { ChangeStreamCallbacks } from '@utils/commons'
import { NoteEntity, NoteFromModel, SetSaved, SetsUseCases } from '@modules/study'
import { getSocketEmitter } from '@index'
import { ScoreRewards, UserMeta, UsersUseCases } from '@modules/users'

export const NoteChangeStreamCallbacks: ChangeStreamCallbacks<NoteFromModel, NoteEntity> = {
	created: async ({ after }) => {
		await getSocketEmitter().emitCreated('study/notes', after)
		await getSocketEmitter().emitCreated(`study/notes/${after.id}`, after)

		await UsersUseCases.updateNerdScore({
			userId: after.user.id,
			amount: ScoreRewards.NewNote
		})
		await UsersUseCases.incrementMeta({ id: after.user.id, value: 1, property: UserMeta.notes })
	},
	updated: async ({ after, before, changes }) => {
		await getSocketEmitter().emitUpdated('study/notes', after)
		await getSocketEmitter().emitUpdated(`study/notes/${after.id}`, after)
	},
	deleted: async ({ before }) => {
		await getSocketEmitter().emitDeleted('study/notes', before)
		await getSocketEmitter().emitDeleted(`study/notes/${before.id}`, before)

		await SetsUseCases.removeProp({ prop: SetSaved.notes, value: before.id })

		await UsersUseCases.updateNerdScore({
			userId: before.user.id,
			amount: -ScoreRewards.NewNote
		})
		await UsersUseCases.incrementMeta({ id: before.user.id, value: -1, property: UserMeta.notes })
	}
}