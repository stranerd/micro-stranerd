import { ChangeStreamCallbacks } from '@utils/commons'
import { AnswerUpvoteEntity, AnswerUpvoteFromModel } from '@modules/questions'
import { getSocketEmitter } from '@index'
import { CountStreakBadges, RecordCountStreak, ScoreRewards, UpdateUserNerdScore } from '@modules/users'

export const AnswerUpvoteChangeStreamCallbacks: ChangeStreamCallbacks<AnswerUpvoteFromModel, AnswerUpvoteEntity> = {
	created: async ({ after }) => {
		await getSocketEmitter().emitCreated('questions/answerUpvotes', after)
		await getSocketEmitter().emitCreated(`questions/answerUpvotes/${after.id}`, after)

		await UpdateUserNerdScore.execute({
			userId: after.userId,
			amount: ScoreRewards.UpvoteAnswer
		})

		await RecordCountStreak.execute({
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

		await UpdateUserNerdScore.execute({
			userId: before.userId,
			amount: -ScoreRewards.UpvoteAnswer
		})

		await RecordCountStreak.execute({
			userId: before.userId,
			activity: CountStreakBadges.NewAnswerVote,
			add: false
		})
	}
}