import { ChangeStreamCallbacks } from '@utils/commons'
import { FlashCardEntity, FlashCardFromModel, SetSaved, SetsUseCases } from '@modules/study'
import { getSocketEmitter } from '@index'
import { ScoreRewards, UserMeta, UsersUseCases } from '@modules/users'

export const FlashCardChangeStreamCallbacks: ChangeStreamCallbacks<FlashCardFromModel, FlashCardEntity> = {
	created: async ({ after }) => {
		await getSocketEmitter().emitCreated('study/flashCards', after)
		await getSocketEmitter().emitCreated(`study/flashCards/${after.id}`, after)

		await UsersUseCases.updateNerdScore({
			userId: after.user.id,
			amount: ScoreRewards.NewFlashCard
		})
		await UsersUseCases.incrementMeta({ id: after.user.id, value: 1, property: UserMeta.flashCards })
	},
	updated: async ({ after }) => {
		await getSocketEmitter().emitUpdated('study/flashCards', after)
		await getSocketEmitter().emitUpdated(`study/flashCards/${after.id}`, after)
	},
	deleted: async ({ before }) => {
		await getSocketEmitter().emitDeleted('flashCards', before)
		await getSocketEmitter().emitDeleted(`flashCards/${before.id}`, before)

		await SetsUseCases.removeProp({ prop: SetSaved.flashCards, value: before.id })
		await UsersUseCases.updateNerdScore({
			userId: before.user.id,
			amount: -ScoreRewards.NewFlashCard
		})
		await UsersUseCases.incrementMeta({ id: before.user.id, value: -1, property: UserMeta.flashCards })
	}
}