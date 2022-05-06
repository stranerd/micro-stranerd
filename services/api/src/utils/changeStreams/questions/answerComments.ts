import { ChangeStreamCallbacks } from '@utils/commons'
import { AnswerCommentEntity, AnswerCommentFromModel, AnswersUseCases } from '@modules/questions'
import { getSocketEmitter } from '@index'
import { BadgesUseCases, CountStreakBadges, ScoreRewards, UserMeta, UsersUseCases } from '@modules/users'
import { sendNotification } from '@utils/modules/users/notifications'

export const AnswerCommentChangeStreamCallbacks: ChangeStreamCallbacks<AnswerCommentFromModel, AnswerCommentEntity> = {
	created: async ({ after }) => {
		await getSocketEmitter().emitCreated('questions/answerComments', after)
		await getSocketEmitter().emitCreated(`questions/answerComments/${after.answerId}`, after)

		await UsersUseCases.incrementMeta({ id: after.user.id, value: 1, property: UserMeta.answerComments })
		await UsersUseCases.updateNerdScore({
			userId: after.user.id,
			amount: ScoreRewards.NewComment
		})

		const answer = await AnswersUseCases.find(after.answerId)
		if (answer && answer.user.id !== after.user.id) await sendNotification([answer.user.id], {
			title: 'New comment to your answer',
			body: 'Your answer has a new comment. Go have a look',
			action: 'answerComments',
			data: { questionId: answer.questionId, answerId: answer.id, commentId: after.id },
			sendEmail: false
		})

		await BadgesUseCases.recordCountStreak({
			userId: after.user.id,
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

		await UsersUseCases.incrementMeta({ id: before.user.id, value: -1, property: UserMeta.answerComments })
		await UsersUseCases.updateNerdScore({
			userId: before.user.id,
			amount: -ScoreRewards.NewComment
		})
		await BadgesUseCases.recordCountStreak({
			userId: before.user.id,
			activity: CountStreakBadges.NewAnswerComment,
			add: false
		})
	}
}