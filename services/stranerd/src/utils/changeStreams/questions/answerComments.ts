import { ChangeStreamCallbacks } from '@utils/commons'
import { AnswerCommentEntity, AnswerCommentFromModel, FindAnswer, UpdateAnswersCommentsCount } from '@modules/questions'
import { getSocketEmitter } from '@index'
import { CountStreakBadges, IncrementUserMetaCount, RecordCountStreak } from '@modules/users'
import { sendNotification } from '@utils/modules/users/notifications'

export const AnswerCommentChangeStreamCallbacks: ChangeStreamCallbacks<AnswerCommentFromModel, AnswerCommentEntity> = {
	created: async ({ after }) => {
		await getSocketEmitter().emitOpenCreated('answersComments', after)
		await getSocketEmitter().emitOpenCreated(`answersComments/${after.answerId}`, after)

		await UpdateAnswersCommentsCount.execute({ id: after.answerId, increment: true })
		await IncrementUserMetaCount.execute({ id: after.userId, value: 1, property: 'answerComments' })

		const answer = await FindAnswer.execute(after.answerId)
		if (answer && answer.userId !== after.userId) await sendNotification(answer.userId, {
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
		await getSocketEmitter().emitOpenUpdated('answersComments', after)
		await getSocketEmitter().emitOpenUpdated(`answersComments/${after.answerId}`, after)
	},
	deleted: async ({ before }) => {
		await getSocketEmitter().emitOpenDeleted('answersComments', before)
		await getSocketEmitter().emitOpenDeleted(`answersComments/${before.answerId}`, before)

		await UpdateAnswersCommentsCount.execute({ id: before.answerId, increment: false })
		await IncrementUserMetaCount.execute({ id: before.userId, value: -1, property: 'answerComments' })

		await RecordCountStreak.execute({
			userId: before.userId,
			activity: CountStreakBadges.NewAnswerComment,
			add: false
		})
	}
}