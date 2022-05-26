import { ChangeStreamCallbacks } from '@utils/commons'
import { SetEntity, SetFromModel } from '@modules/study'
import { getSocketEmitter } from '@index'
import { ScoreRewards, UserMeta, UsersUseCases } from '@modules/users'

export const SetChangeStreamCallbacks: ChangeStreamCallbacks<SetFromModel, SetEntity> = {
	created: async ({ after }) => {
		await getSocketEmitter().emitCreated('study/sets', after)
		await getSocketEmitter().emitCreated(`study/sets/${after.id}`, after)

		await UsersUseCases.updateNerdScore({
			userId: after.user.id,
			amount: ScoreRewards.NewSet
		})
		await UsersUseCases.incrementMeta({ id: after.user.id, value: 1, property: UserMeta.sets })
	},
	updated: async ({ after }) => {
		await getSocketEmitter().emitUpdated('study/sets', after)
		await getSocketEmitter().emitUpdated(`study/sets/${after.id}`, after)
	},
	deleted: async ({ before }) => {
		await getSocketEmitter().emitDeleted('study/sets', before)
		await getSocketEmitter().emitDeleted(`study/sets/${before.id}`, before)

		await UsersUseCases.updateNerdScore({
			userId: before.user.id,
			amount: -ScoreRewards.NewSet
		})
		await UsersUseCases.incrementMeta({ id: before.user.id, value: -1, property: UserMeta.sets })
	}
}