import { ChangeStreamCallbacks } from '@utils/commons'
import { RemoveSetProp, SetEntity, SetFromModel, SetSaved } from '@modules/study'
import { getSocketEmitter } from '@index'
import { IncrementUserMetaCount, ScoreRewards, UpdateUserNerdScore, UserMeta } from '@modules/users'

export const SetChangeStreamCallbacks: ChangeStreamCallbacks<SetFromModel, SetEntity> = {
	created: async ({ after }) => {
		await getSocketEmitter().emitCreated('study/sets', after)
		await getSocketEmitter().emitCreated(`study/sets/${after.id}`, after)

		await UpdateUserNerdScore.execute({
			userId: after.userId,
			amount: ScoreRewards.NewSet
		})
		await IncrementUserMetaCount.execute({ id: after.userId, value: 1, property: UserMeta.sets })
	},
	updated: async ({ after }) => {
		await getSocketEmitter().emitUpdated('study/sets', after)
		await getSocketEmitter().emitUpdated(`study/sets/${after.id}`, after)
	},
	deleted: async ({ before }) => {
		await getSocketEmitter().emitDeleted('study/sets', before)
		await getSocketEmitter().emitDeleted(`study/sets/${before.id}`, before)
		await RemoveSetProp.execute({ prop: SetSaved.sets, value: before.id })

		await UpdateUserNerdScore.execute({
			userId: before.userId,
			amount: -ScoreRewards.NewSet
		})
		await IncrementUserMetaCount.execute({ id: before.userId, value: -1, property: UserMeta.sets })
	}
}