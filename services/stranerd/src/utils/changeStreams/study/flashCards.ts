import { ChangeStreamCallbacks } from '@utils/commons'
import { FlashCardEntity, FlashCardFromModel, RemoveSetProp } from '@modules/study'
import { getSocketEmitter } from '@index'
import { ScoreRewards, UpdateUserNerdScore } from '@modules/users'

export const FlashCardChangeStreamCallbacks: ChangeStreamCallbacks<FlashCardFromModel, FlashCardEntity> = {
	created: async ({ after }) => {
		await getSocketEmitter().emitOpenCreated('flashCards', after)
		await getSocketEmitter().emitOpenCreated(`flashCards/${after.id}`, after)

		await UpdateUserNerdScore.execute({
			userId: after.userId,
			amount: ScoreRewards.NewFlashCard
		})
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
	}
}