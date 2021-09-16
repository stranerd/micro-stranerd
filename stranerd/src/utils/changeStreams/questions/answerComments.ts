import { ChangeStreamCallbacks } from '@utils/commons'
import { AnswerCommentEntity, AnswerCommentFromModel, FindAnswer, ModifyCommentsCount } from '@modules/questions'
import { getSocketEmitter } from '@index'
import { IncrementUserMetaCount } from '@modules/users'
import { sendNotification } from '@utils/modules/users/notifications'

export const AnswerCommentChangeStreamCallbacks: ChangeStreamCallbacks<AnswerCommentFromModel, AnswerCommentEntity> = {
	created: async ({ after }) => {
		await getSocketEmitter().emitOpenCreated('answersComments', after)
		await getSocketEmitter().emitOpenCreated(`answersComments/${after.answerId}`, after)

		await ModifyCommentsCount.execute({ id: after.answerId, increment: true })
		await IncrementUserMetaCount.execute({ id: after.userId, value: 1, property: 'answerComments' })

		const answer = await FindAnswer.execute(after.answerId)
		if (answer) await sendNotification(answer.userId, {
			body: 'Your question has a new comment. Go have a look',
			action: 'answers',
			data: { questionId: answer.questionId, answerId: answer.id }
		})
	},
	updated: async ({ after }) => {
		await getSocketEmitter().emitOpenUpdated('answersComments', after)
		await getSocketEmitter().emitOpenUpdated(`answersComments/${after.answerId}`, after)
	},
	deleted: async ({ before }) => {
		await getSocketEmitter().emitOpenDeleted('answersComments', before)
		await getSocketEmitter().emitOpenDeleted(`answersComments/${before.answerId}`, before)

		await ModifyCommentsCount.execute({ id: before.answerId, increment: false })
		await IncrementUserMetaCount.execute({ id: before.userId, value: -1, property: 'answerComments' })
	}
}