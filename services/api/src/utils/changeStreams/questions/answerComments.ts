import { ChangeStreamCallbacks } from '@utils/commons'
import { AnswerCommentEntity, AnswerCommentFromModel, FindAnswer } from '@modules/questions'
import { getSocketEmitter } from '@index'
import { BadgesUseCases, CountStreakBadges, ScoreRewards, UserMeta, UsersUseCases } from '@modules/users'
import { sendNotification } from '@utils/modules/users/notifications'

export const AnswerCommentChangeStreamCallbacks: ChangeStreamCallbacks<AnswerCommentFromModel, AnswerCommentEntity> = {
	created: async ({ after }) => {
		await getSocketEmitter().emitCreated('questions/answerComments', after)
		await getSocketEmitter().emitCreated(`questions/answerComments/${after.answerId}`, after)

		await UsersUseCases.incrementMeta({ id: after.userId, value: 1, property: UserMeta.answerComments })
		await UsersUseCases.updateNerdScore({
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

		await BadgesUseCases.recordCountStreak({
			userId: after.userId,
			activity: CountStreakBadges.NewAnswerComment,
			add: true
		})
	},
	updated: async ({ after }) => {
		await getSocketEmitter().emitUpdated('questions/answerComments', after)
		await getSocketEmitter().emitUpdated(`questions/answerComments/${after.answerId}`, after)
	},
	deleted: async ({ before }) => {
		await getSocketEmitter().emitDeleted('questions/answerComments', before)
		await getSocketEmitter().emitDeleted(`questions/answerComments/${before.answerId}`, before)

		await UsersUseCases.incrementMeta({ id: before.userId, value: -1, property: UserMeta.answerComments })
		await UsersUseCases.updateNerdScore({
			userId: before.userId,
			amount: -ScoreRewards.NewComment
		})
		await BadgesUseCases.recordCountStreak({
			userId: before.userId,
			activity: CountStreakBadges.NewAnswerComment,
			add: false
		})
	}
}