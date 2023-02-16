import { SetEntity, SetFromModel } from '@modules/study'
import { ScoreRewards, UserMeta, UsersUseCases } from '@modules/users'
import { ChangeStreamCallbacks } from '@utils/app/package'
import { appInstance } from '@utils/app/types'

export const SetChangeStreamCallbacks: ChangeStreamCallbacks<SetFromModel, SetEntity> = {
	created: async ({ after }) => {
		await appInstance.listener.created('study/sets', after)
		await appInstance.listener.created(`study/sets/${after.id}`, after)

		await UsersUseCases.updateNerdScore({
			userId: after.user.id,
			amount: ScoreRewards.NewSet
		})
		await UsersUseCases.incrementMeta({ id: after.user.id, value: 1, property: UserMeta.sets })
	},
	updated: async ({ after }) => {
		await appInstance.listener.updated('study/sets', after)
		await appInstance.listener.updated(`study/sets/${after.id}`, after)
	},
	deleted: async ({ before }) => {
		await appInstance.listener.deleted('study/sets', before)
		await appInstance.listener.deleted(`study/sets/${before.id}`, before)

		await UsersUseCases.updateNerdScore({
			userId: before.user.id,
			amount: -ScoreRewards.NewSet
		})
		await UsersUseCases.incrementMeta({ id: before.user.id, value: -1, property: UserMeta.sets })
	}
}