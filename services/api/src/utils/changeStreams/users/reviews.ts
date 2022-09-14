import { ChangeStreamCallbacks } from '@utils/app/package'
import { ReviewEntity, ReviewFromModel, UsersUseCases } from '@modules/users'
import { getSocketEmitter } from '@index'

export const ReviewChangeStreamCallbacks: ChangeStreamCallbacks<ReviewFromModel, ReviewEntity> = {
	created: async ({ after }) => {
		await getSocketEmitter().emitCreated('users/reviews', after)
		await getSocketEmitter().emitCreated(`users/reviews/${after.id}`, after)
		await UsersUseCases.updateRatings({
			userId: after.user.id,
			ratings: after.rating,
			add: true
		})
	},
	updated: async ({ before, after, changes }) => {
		await getSocketEmitter().emitUpdated('users/reviews', after)
		await getSocketEmitter().emitUpdated(`users/reviews/${after.id}`, after)
		if (changes.rating) {
			await UsersUseCases.updateRatings({
				userId: before.user.id,
				ratings: before.rating,
				add: false
			})
			await UsersUseCases.updateRatings({
				userId: after.user.id,
				ratings: after.rating,
				add: true
			})
		}
	},
	deleted: async ({ before }) => {
		await getSocketEmitter().emitDeleted('users/reviews', before)
		await getSocketEmitter().emitDeleted(`users/reviews/${before.id}`, before)
		await UsersUseCases.updateRatings({
			userId: before.user.id,
			ratings: before.rating,
			add: false
		})
	}
}