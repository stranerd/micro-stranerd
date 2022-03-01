import { ChangeStreamCallbacks } from '@utils/commons'
import { AnswerCommentEntity, AnswerCommentFromModel, FindAnswer } from '@modules/questions'
import { getSocketEmitter } from '@index'
import {
	CountStreakBadges,
	IncrementUserMetaCount,
	RecordCountStreak,
	ScoreRewards,
	UpdateUserNerdScore,
	UserMeta
} from '@modules/users'
import { sendNotification } from '@utils/modules/users/notifications'

export const AnswerCommentChangeStreamCallbacks: ChangeStreamCallbacks<AnswerCommentFromModel, AnswerCommentEntity> = {
	created: async ({ after }) => {
		await getSocketEmitter().emitOpenCreated('questions/answersComments', after)
		await getSocketEmitter().emitOpenCreated(`questions/answersComments/${after.answerId}`, after)

		await IncrementUserMetaCount.execute({ id: after.userId, value: 1, property: UserMeta.answerComments })
		await UpdateUserNerdScore.execute({
			userId: after.userId,
			amount: ScoreRewards.NewComment
		})

		const answer = await FindAnswer.execute(after.answerId)
		if (answer && answer.userId !== after.userId) await sendNotification(answer.userId, {
			title: 'New comment to your answer',
			body: 'Your answer has a new comment. Go have a look',
			action: 'answerComments',
			data: { questionId: answer.questionId, answerId: answer.id, commentId: after.id }
		})

		await RecordCountStreak.execute({
			userId: after.userId,
			activity: CountStreakBadges.NewAnswerComment,
			add: true
		})
	},
	updated: async ({ after }) => {
		await getSocketEmitter().emitOpenUpdated('questions/answersComments', after)
		await getSocketEmitter().emitOpenUpdated(`questions/answersComments/${after.answerId}`, after)
	},
	deleted: async ({ before }) => {
		await getSocketEmitter().emitOpenDeleted('questions/answersComments', before)
		await getSocketEmitter().emitOpenDeleted(`questions/answersComments/${before.answerId}`, before)

		await IncrementUserMetaCount.execute({ id: before.userId, value: -1, property: UserMeta.answerComments })
		await UpdateUserNerdScore.execute({
			userId: before.userId,
			amount: -ScoreRewards.NewComment
		})
		await RecordCountStreak.execute({
			userId: before.userId,
			activity: CountStreakBadges.NewAnswerComment,
			add: false
		})
	}
}