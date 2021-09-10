import { ChangeStreamCallbacks } from '@utils/commons'
import { ReviewEntity, ReviewFromModel, UpdateUserRatings } from '@modules/users'

export const ReviewChangeStreamCallbacks: ChangeStreamCallbacks<ReviewFromModel, ReviewEntity> = {
	created: async ({ after }) => {
		await UpdateUserRatings.execute({
			userId: after.userId,
			ratings: after.rating,
			add: true
		})
	},
	updated: async ({ before, after, changes }) => {
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
		await UpdateUserRatings.execute({
			userId: before.userId,
			ratings: before.rating,
			add: false
		})
	}
}