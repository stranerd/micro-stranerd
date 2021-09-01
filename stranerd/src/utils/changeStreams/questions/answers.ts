import { ChangeStreamCallbacks } from '@utils/commons'
import { AnswerFromModel } from '@modules/questions/data/models/answers'
import { getSocketEmitter } from '@index'
import { IncrementUserAnswersCount } from '@modules/users'
import { sendNotification } from '@utils/modules/users/notifications'
import { AnswerEntity } from '@modules/questions/domain/entities'
import { DeleteAnswerComments, ModifyAnswers, RemoveBestAnswer } from '@modules/questions'

export const AnswerChangeStreamCallbacks: ChangeStreamCallbacks<AnswerFromModel, AnswerEntity> = {
	created: async ({ after }) => {
		await getSocketEmitter().emitCreated(`answers/${ after.questionId }`, after)

		await IncrementUserAnswersCount.execute({ id: after.userId, value: 1 })
		await ModifyAnswers.execute({ id: after.id, userId: after.userId, add: true })

		await sendNotification(after.userId, {
			body: 'Your question has been answered. Go have a look',
			action: `/questions/${ after.questionId }#${ after.id }`
		})
		await sendNotification(after.userId, {
			body: 'You asked a question and we\'ve answered! Go view all answers to your question',
			action: `/questions/${ after.questionId }#${ after.id }`
		}, 'New Answer')
	},
	updated: async ({ after }) => {
		await getSocketEmitter().emitUpdated(`answers/${ after.questionId }`, after)
		await getSocketEmitter().emitUpdated(`answers/${ after.id }`, after)
	},
	deleted: async ({ before }) => {
		await getSocketEmitter().emitDeleted(`answers/${ before.questionId }`, before)
		await getSocketEmitter().emitDeleted(`answers/${ before.id }`, before)

		await IncrementUserAnswersCount.execute({ id: before.userId, value: -1 })
		await ModifyAnswers.execute({ id: before.id, userId: before.userId, add: false })

		if (before.best) await RemoveBestAnswer.execute({ id: before.questionId, answerId: before.id })
		await DeleteAnswerComments.execute({ answerId: before.id })
	}
}