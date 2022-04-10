import { ChangeStreamCallbacks } from '@utils/commons'
import { FlashCardEntity, FlashCardFromModel, RemoveSetProp, SetSaved } from '@modules/study'
import { getSocketEmitter } from '@index'
import { IncrementUserMetaCount, ScoreRewards, UpdateUserNerdScore, UserMeta } from '@modules/users'

getSocketEmitter().register('study/flashCards', getSocketEmitter().quickRegisters.isOpen)
export const FlashCardChangeStreamCallbacks: ChangeStreamCallbacks<FlashCardFromModel, FlashCardEntity> = {
	created: async ({ after }) => {
		await getSocketEmitter().emitCreated('study/flashCards', after)
		await getSocketEmitter().emitCreated(`study/flashCards/${after.id}`, after)

		await UpdateUserNerdScore.execute({
			userId: after.userId,
			amount: ScoreRewards.NewFlashCard
		})
		await IncrementUserMetaCount.execute({ id: after.userId, value: 1, property: UserMeta.flashCards })
	},
	updated: async ({ after }) => {
		await getSocketEmitter().emitUpdated('study/flashCards', after)
		await getSocketEmitter().emitUpdated(`study/flashCards/${after.id}`, after)
	},
	deleted: async ({ before }) => {
		await getSocketEmitter().emitDeleted('flashCards', before)
		await getSocketEmitter().emitDeleted(`flashCards/${before.id}`, before)

		await RemoveSetProp.execute({ prop: SetSaved.flashCards, value: before.id })
		await UpdateUserNerdScore.execute({
			userId: before.userId,
			amount: -ScoreRewards.NewFlashCard
		})
		await IncrementUserMetaCount.execute({ id: before.userId, value: -1, property: UserMeta.flashCards })
	}
}