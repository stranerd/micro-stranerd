import { FlashCardEntity, FlashCardFromModel, SetSaved, SetsUseCases } from '@modules/study'
import { ScoreRewards, UserMeta, UsersUseCases } from '@modules/users'
import { ChangeStreamCallbacks } from '@utils/app/package'
import { appInstance } from '@utils/app/types'

export const FlashCardChangeStreamCallbacks: ChangeStreamCallbacks<FlashCardFromModel, FlashCardEntity> = {
	created: async ({ after }) => {
		await appInstance.listener.created('study/flashCards', after)
		await appInstance.listener.created(`study/flashCards/${after.id}`, after)

		await UsersUseCases.updateNerdScore({
			userId: after.user.id,
			amount: ScoreRewards.NewFlashCard
		})
		await UsersUseCases.incrementMeta({ id: after.user.id, value: 1, property: UserMeta.flashCards })
	},
	updated: async ({ after }) => {
		await appInstance.listener.updated('study/flashCards', after)
		await appInstance.listener.updated(`study/flashCards/${after.id}`, after)
	},
	deleted: async ({ before }) => {
		await appInstance.listener.deleted('flashCards', before)
		await appInstance.listener.deleted(`flashCards/${before.id}`, before)

		await SetsUseCases.removeProp({ prop: SetSaved.flashCards, value: before.id })
		await UsersUseCases.updateNerdScore({
			userId: before.user.id,
			amount: -ScoreRewards.NewFlashCard
		})
		await UsersUseCases.incrementMeta({ id: before.user.id, value: -1, property: UserMeta.flashCards })
	}
}