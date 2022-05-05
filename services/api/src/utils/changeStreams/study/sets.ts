import { ChangeStreamCallbacks } from '@utils/commons'
import { SetEntity, SetFromModel, SetSaved, SetsUseCases } from '@modules/study'
import { getSocketEmitter } from '@index'
import { ScoreRewards, UserMeta, UsersUseCases } from '@modules/users'

export const SetChangeStreamCallbacks: ChangeStreamCallbacks<SetFromModel, SetEntity> = {
	created: async ({ after }) => {
		await getSocketEmitter().emitCreated('study/sets', after)
		await getSocketEmitter().emitCreated(`study/sets/${after.id}`, after)

		await UsersUseCases.updateNerdScore({
			userId: after.userId,
			amount: ScoreRewards.NewSet
		})
		await UsersUseCases.incrementMeta({ id: after.userId, value: 1, property: UserMeta.sets })
	},
	updated: async ({ after }) => {
		await getSocketEmitter().emitUpdated('study/sets', after)
		await getSocketEmitter().emitUpdated(`study/sets/${after.id}`, after)
	},
	deleted: async ({ before }) => {
		await getSocketEmitter().emitDeleted('study/sets', before)
		await getSocketEmitter().emitDeleted(`study/sets/${before.id}`, before)
		await SetsUseCases.removeSetProp({ prop: SetSaved.sets, value: before.id })

		await UsersUseCases.updateNerdScore({
			userId: before.userId,
			amount: -ScoreRewards.NewSet
		})
		await UsersUseCases.incrementMeta({ id: before.userId, value: -1, property: UserMeta.sets })
	}
}