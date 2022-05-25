import { ChangeStreamCallbacks, EventTypes } from '@utils/commons'
import { FileEntity, FileFromModel, SetSaved, SetsUseCases } from '@modules/study'
import { getSocketEmitter } from '@index'
import { publishers } from '@utils/events'
import { ScoreRewards, UserMeta, UsersUseCases } from '@modules/users'

export const FileChangeStreamCallbacks: ChangeStreamCallbacks<FileFromModel, FileEntity> = {
	created: async ({ after }) => {
		await getSocketEmitter().emitCreated('study/files', after)
		await getSocketEmitter().emitCreated(`study/files/${after.id}`, after)

		await UsersUseCases.updateNerdScore({
			userId: after.user.id,
			amount: ScoreRewards.NewFile
		})
		await UsersUseCases.incrementMeta({ id: after.user.id, value: 1, property: UserMeta.files })
	},
	updated: async ({ after, before, changes }) => {
		await getSocketEmitter().emitUpdated('study/files', after)
		await getSocketEmitter().emitUpdated(`study/files/${after.id}`, after)

		if (changes.media && before.media) await publishers[EventTypes.DELETEFILE].publish(before.media)
	},
	deleted: async ({ before }) => {
		await getSocketEmitter().emitDeleted('study/files', before)
		await getSocketEmitter().emitDeleted(`study/files/${before.id}`, before)

		await SetsUseCases.removeProp({ prop: SetSaved.files, value: before.id })

		await UsersUseCases.updateNerdScore({
			userId: before.user.id,
			amount: -ScoreRewards.NewFile
		})
		await UsersUseCases.incrementMeta({ id: before.user.id, value: -1, property: UserMeta.files })

		if (before.media) await publishers[EventTypes.DELETEFILE].publish(before.media)
	}
}