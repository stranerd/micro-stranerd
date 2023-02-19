import { NoteEntity, NoteFromModel, SetSaved, SetsUseCases } from '@modules/study'
import { ScoreRewards, UserMeta, UsersUseCases } from '@modules/users'
import { DbChangeCallbacks } from '@utils/app/package'
import { appInstance } from '@utils/app/types'

export const NoteDbChangeCallbacks: DbChangeCallbacks<NoteFromModel, NoteEntity> = {
	created: async ({ after }) => {
		await appInstance.listener.created('study/notes', after)
		await appInstance.listener.created(`study/notes/${after.id}`, after)

		await UsersUseCases.updateNerdScore({
			userId: after.user.id,
			amount: ScoreRewards.NewNote
		})
		await UsersUseCases.incrementMeta({ id: after.user.id, value: 1, property: UserMeta.notes })
	},
	updated: async ({ after }) => {
		await appInstance.listener.updated('study/notes', after)
		await appInstance.listener.updated(`study/notes/${after.id}`, after)
	},
	deleted: async ({ before }) => {
		await appInstance.listener.deleted('study/notes', before)
		await appInstance.listener.deleted(`study/notes/${before.id}`, before)

		await SetsUseCases.removeProp({ prop: SetSaved.notes, value: before.id })

		await UsersUseCases.updateNerdScore({
			userId: before.user.id,
			amount: -ScoreRewards.NewNote
		})
		await UsersUseCases.incrementMeta({ id: before.user.id, value: -1, property: UserMeta.notes })
	}
}