import { ChangeStreamCallbacks } from '@utils/commons'
import { AnswerCommentFromModel } from '@modules/questions/data/models/answerComments'
import { AnswerCommentEntity } from '@modules/questions/domain/entities'
import { FindAnswer, ModifyCommentsCount } from '@modules/questions'
import { getSocketEmitter } from '@index'
import { IncrementUserAnswerCommentsCount } from '@modules/users'
import { sendNotification } from '@utils/modules/users/notifications'

export const AnswerCommentChangeStreamCallbacks: ChangeStreamCallbacks<AnswerCommentFromModel, AnswerCommentEntity> = {
	created: async ({ after }) => {
		await getSocketEmitter().emitCreated(`answersComments/${ after.answerId }`, after)

		await ModifyCommentsCount.execute({ id: after.answerId, increment: true })
		await IncrementUserAnswerCommentsCount.execute({ id: after.userId, value: 1 })

		const answer = await FindAnswer.execute(after.answerId)
		if (answer) await sendNotification(answer.userId, {
			body: 'Your question has a new comment. Go have a look',
			action: `/questions/${ answer.questionId }#${ answer.id }`
		})
	},
	deleted: async ({ before }) => {
		await getSocketEmitter().emitDeleted(`answersComments/${ before.answerId }`, before)

		await ModifyCommentsCount.execute({ id: before.answerId, increment: false })
		await IncrementUserAnswerCommentsCount.execute({ id: before.userId, value: -1 })
	}
}