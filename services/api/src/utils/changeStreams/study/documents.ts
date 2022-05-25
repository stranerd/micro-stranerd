import { ChangeStreamCallbacks, EventTypes } from '@utils/commons'
import { DocumentEntity, DocumentFromModel, SetSaved, SetsUseCases } from '@modules/study'
import { getSocketEmitter } from '@index'
import { publishers } from '@utils/events'
import { ScoreRewards, UserMeta, UsersUseCases } from '@modules/users'

export const DocumentChangeStreamCallbacks: ChangeStreamCallbacks<DocumentFromModel, DocumentEntity> = {
	created: async ({ after }) => {
		await getSocketEmitter().emitCreated('study/documents', after)
		await getSocketEmitter().emitCreated(`study/documents/${after.id}`, after)

		await UsersUseCases.updateNerdScore({
			userId: after.user.id,
			amount: ScoreRewards.NewDocument
		})
		await UsersUseCases.incrementMeta({ id: after.user.id, value: 1, property: UserMeta.documents })
	},
	updated: async ({ after, before, changes }) => {
		await getSocketEmitter().emitUpdated('study/documents', after)
		await getSocketEmitter().emitUpdated(`study/documents/${after.id}`, after)

		if (changes.media && before.media) await publishers[EventTypes.DELETEFILE].publish(before.media)
	},
	deleted: async ({ before }) => {
		await getSocketEmitter().emitDeleted('study/documents', before)
		await getSocketEmitter().emitDeleted(`study/documents/${before.id}`, before)

		await SetsUseCases.removeProp({ prop: SetSaved.documents, value: before.id })

		await UsersUseCases.updateNerdScore({
			userId: before.user.id,
			amount: -ScoreRewards.NewDocument
		})
		await UsersUseCases.incrementMeta({ id: before.user.id, value: -1, property: UserMeta.documents })

		if (before.media) await publishers[EventTypes.DELETEFILE].publish(before.media)
	}
}