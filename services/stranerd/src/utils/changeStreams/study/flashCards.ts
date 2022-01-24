import { ChangeStreamCallbacks } from '@utils/commons'
import { FlashCardEntity, FlashCardFromModel, GetSets, RemoveSetProp, UpdateSetProp } from '@modules/study'
import { getSocketEmitter } from '@index'
import { IncrementUserMetaCount, ScoreRewards, UpdateUserNerdScore, UserMeta } from '@modules/users'

export const FlashCardChangeStreamCallbacks: ChangeStreamCallbacks<FlashCardFromModel, FlashCardEntity> = {
	created: async ({ after }) => {
		await getSocketEmitter().emitOpenCreated('flashCards', after)
		await getSocketEmitter().emitOpenCreated(`flashCards/${after.id}`, after)

		const rootSet = await GetSets.execute({
			where: [
				{ field: 'isRoot', value: true },
				{ field: 'userId', value: after.userId }
			]
		})

		if (rootSet) await UpdateSetProp.execute({
			id: rootSet.id,
			prop: 'flashCards',
			values: [after.id],
			userId: after.userId,
			add: true
		})

		await UpdateUserNerdScore.execute({
			userId: after.userId,
			amount: ScoreRewards.NewFlashCard
		})
		await IncrementUserMetaCount.execute({ id: after.userId, value: 1, property: UserMeta.flashCards })
	},
	updated: async ({ after }) => {
		await getSocketEmitter().emitOpenUpdated('flashCards', after)
		await getSocketEmitter().emitOpenUpdated(`flashCards/${after.id}`, after)
	},
	deleted: async ({ before }) => {
		await getSocketEmitter().emitOpenDeleted('flashCards', before)
		await getSocketEmitter().emitOpenDeleted(`flashCards/${before.id}`, before)

		await UpdateUserNerdScore.execute({
			userId: before.userId,
			amount: -ScoreRewards.NewFlashCard
		})

		await RemoveSetProp.execute({ prop: 'flashCards', value: before.id })
		await IncrementUserMetaCount.execute({ id: before.userId, value: 1, property: UserMeta.flashCards })
	}
}