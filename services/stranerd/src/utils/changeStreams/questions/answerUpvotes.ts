import { ChangeStreamCallbacks } from '@utils/commons'
import { AnswerUpvoteEntity, AnswerUpvoteFromModel } from '@modules/questions'
import { getSocketEmitter } from '@index'
import { CountStreakBadges, RecordCountStreak, ScoreRewards, UpdateUserNerdScore } from '@modules/users'

export const AnswerUpvoteChangeStreamCallbacks: ChangeStreamCallbacks<AnswerUpvoteFromModel, AnswerUpvoteEntity> = {
	created: async ({ after }) => {
		await getSocketEmitter().emitOpenCreated('answerUpvotes', after)
		await getSocketEmitter().emitOpenCreated(`answerUpvotes/${after.id}`, after)

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
		await getSocketEmitter().emitOpenUpdated('answerUpvotes', after)
		await getSocketEmitter().emitOpenUpdated(`answerUpvotes/${after.id}`, after)
	},
	deleted: async ({ before }) => {
		await getSocketEmitter().emitOpenDeleted('answerUpvotes', before)
		await getSocketEmitter().emitOpenDeleted(`answerUpvotes/${before.id}`, before)

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