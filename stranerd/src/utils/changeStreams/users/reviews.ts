import { ChangeStreamCallbacks } from '@utils/commons'
import { ReviewEntity, ReviewFromModel, UpdateUserRatings } from '@modules/users'
import { getSocketEmitter } from '@index'

export const ReviewChangeStreamCallbacks: ChangeStreamCallbacks<ReviewFromModel, ReviewEntity> = {
	created: async ({ after }) => {
		await getSocketEmitter().emitCreated('reviews', after)
		await getSocketEmitter().emitCreated(`reviews/${after.id}`, after)
		await UpdateUserRatings.execute({
			userId: after.userId,
			ratings: after.rating,
			add: true
		})
	},
	updated: async ({ before, after, changes }) => {
		await getSocketEmitter().emitUpdated('reviews', after)
		await getSocketEmitter().emitUpdated(`reviews/${after.id}`, after)
		if (changes.rating) {
			await UpdateUserRatings.execute({
				userId: before.userId,
				ratings: before.rating,
				add: false
			})
			await UpdateUserRatings.execute({
				userId: after.userId,
				ratings: after.rating,
				add: true
			})
		}
	},
	deleted: async ({ before }) => {
		await getSocketEmitter().emitDeleted('reviews', before)
		await getSocketEmitter().emitDeleted(`reviews/${before.id}`, before)
		await UpdateUserRatings.execute({
			userId: before.userId,
			ratings: before.rating,
			add: false
		})
	}
}