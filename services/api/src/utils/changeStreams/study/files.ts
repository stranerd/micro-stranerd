import { FileEntity, FileFromModel, SetSaved, SetsUseCases } from '@modules/study'
import { ScoreRewards, UserMeta, UsersUseCases } from '@modules/users'
import { ChangeStreamCallbacks } from '@utils/app/package'
import { appInstance } from '@utils/app/types'
import { publishers } from '@utils/events'

export const FileChangeStreamCallbacks: ChangeStreamCallbacks<FileFromModel, FileEntity> = {
	created: async ({ after }) => {
		await appInstance.listener.created('study/files', after)
		await appInstance.listener.created(`study/files/${after.id}`, after)

		await UsersUseCases.updateNerdScore({
			userId: after.user.id,
			amount: ScoreRewards.NewFile
		})
		await UsersUseCases.incrementMeta({ id: after.user.id, value: 1, property: UserMeta.files })
	},
	updated: async ({ after, before, changes }) => {
		await appInstance.listener.updated('study/files', after)
		await appInstance.listener.updated(`study/files/${after.id}`, after)
		if (changes.media) await publishers.DELETEFILE.publish(before.media)
	},
	deleted: async ({ before }) => {
		await appInstance.listener.deleted('study/files', before)
		await appInstance.listener.deleted(`study/files/${before.id}`, before)

		await SetsUseCases.removeProp({ prop: SetSaved.files, value: before.id })

		await UsersUseCases.updateNerdScore({
			userId: before.user.id,
			amount: -ScoreRewards.NewFile
		})
		await UsersUseCases.incrementMeta({ id: before.user.id, value: -1, property: UserMeta.files })
		await publishers.DELETEFILE.publish(before.media)
	}
}