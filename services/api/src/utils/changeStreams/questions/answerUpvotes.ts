import { ChangeStreamCallbacks } from '@utils/commons'
import { AnswerUpvoteEntity, AnswerUpvoteFromModel } from '@modules/questions'
import { getSocketEmitter } from '@index'
import { BadgesUseCases, CountStreakBadges, ScoreRewards, UsersUseCases } from '@modules/users'

export const AnswerUpvoteChangeStreamCallbacks: ChangeStreamCallbacks<AnswerUpvoteFromModel, AnswerUpvoteEntity> = {
	created: async ({ after }) => {
		await getSocketEmitter().emitCreated('questions/answerUpvotes', after)
		await getSocketEmitter().emitCreated(`questions/answerUpvotes/${after.id}`, after)

		await UsersUseCases.updateNerdScore({
			userId: after.userId,
			amount: ScoreRewards.UpvoteAnswer
		})

		await BadgesUseCases.recordCountStreak({
			userId: after.userId,
			activity: CountStreakBadges.NewAnswerVote,
			add: true
		})
	},
	updated: async ({ after }) => {
		await getSocketEmitter().emitUpdated('questions/answerUpvotes', after)
		await getSocketEmitter().emitUpdated(`questions/answerUpvotes/${after.id}`, after)
	},
	deleted: async ({ before }) => {
		await getSocketEmitter().emitDeleted('questions/answerUpvotes', before)
		await getSocketEmitter().emitDeleted(`questions/answerUpvotes/${before.id}`, before)

		await UsersUseCases.updateNerdScore({
			userId: before.userId,
			amount: -ScoreRewards.UpvoteAnswer
		})

		await BadgesUseCases.recordCountStreak({
			userId: before.userId,
			activity: CountStreakBadges.NewAnswerVote,
			add: false
		})
	}
}