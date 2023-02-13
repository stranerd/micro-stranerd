import { ChangeStreamCallbacks } from '@utils/app/package'
import { FlashCardEntity, FlashCardFromModel, SetSaved, SetsUseCases } from '@modules/study'
import { ScoreRewards, UserMeta, UsersUseCases } from '@modules/users'
import { appInstance } from '@utils/app/types'

export const FlashCardChangeStreamCallbacks: ChangeStreamCallbacks<FlashCardFromModel, FlashCardEntity> = {
	created: async ({ after }) => {
		await appInstance.socketEmitter.emitCreated('study/flashCards', after)
		await appInstance.socketEmitter.emitCreated(`study/flashCards/${after.id}`, after)

		await UsersUseCases.updateNerdScore({
			userId: after.user.id,
			amount: ScoreRewards.NewFlashCard
		})
		await UsersUseCases.incrementMeta({ id: after.user.id, value: 1, property: UserMeta.flashCards })
	},
	updated: async ({ after }) => {
		await appInstance.socketEmitter.emitUpdated('study/flashCards', after)
		await appInstance.socketEmitter.emitUpdated(`study/flashCards/${after.id}`, after)
	},
	deleted: async ({ before }) => {
		await appInstance.socketEmitter.emitDeleted('flashCards', before)
		await appInstance.socketEmitter.emitDeleted(`flashCards/${before.id}`, before)

		await SetsUseCases.removeProp({ prop: SetSaved.flashCards, value: before.id })
		await UsersUseCases.updateNerdScore({
			userId: before.user.id,
			amount: -ScoreRewards.NewFlashCard
		})
		await UsersUseCases.incrementMeta({ id: before.user.id, value: -1, property: UserMeta.flashCards })
	}
}