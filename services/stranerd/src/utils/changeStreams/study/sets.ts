import { ChangeStreamCallbacks } from '@utils/commons'
import { DeleteSetChildren, SetEntity, SetFromModel, UpdateSetChildren } from '@modules/study'
import { getSocketEmitter } from '@index'
import { IncrementUserMetaCount, ScoreRewards, UpdateUserNerdScore, UserMeta } from '@modules/users'

export const SetChangeStreamCallbacks: ChangeStreamCallbacks<SetFromModel, SetEntity> = {
	created: async ({ after }) => {
		await getSocketEmitter().emitOpenCreated('sets', after)
		await getSocketEmitter().emitOpenCreated(`sets/${after.id}`, after)

		if (after.parent) {
			await UpdateSetChildren.execute({ id: after.parent, add: true, values: [after.id] })
			await UpdateUserNerdScore.execute({
				userId: after.userId,
				amount: ScoreRewards.NewSet
			})
			await IncrementUserMetaCount.execute({ id: after.userId, value: 1, property: UserMeta.sets })
		}
	},
	updated: async ({ after, before, changes }) => {
		await getSocketEmitter().emitOpenUpdated('sets', after)
		await getSocketEmitter().emitOpenUpdated(`sets/${after.id}`, after)

		if (changes.parent) {
			if (after.parent) await UpdateSetChildren.execute({ id: after.parent, add: true, values: [after.id] })
			if (before.parent) await UpdateSetChildren.execute({ id: before.parent, add: false, values: [before.id] })
		}
	},
	deleted: async ({ before }) => {
		await getSocketEmitter().emitOpenCreated('sets', before)
		await getSocketEmitter().emitOpenCreated(`sets/${before.id}`, before)
		await DeleteSetChildren.execute(before.id)

		if (before.parent) {
			await UpdateSetChildren.execute({ id: before.parent, add: false, values: [before.id] })
			await UpdateUserNerdScore.execute({
				userId: before.userId,
				amount: -ScoreRewards.NewSet
			})
			await IncrementUserMetaCount.execute({ id: before.userId, value: -1, property: UserMeta.sets })
		}
	}
}