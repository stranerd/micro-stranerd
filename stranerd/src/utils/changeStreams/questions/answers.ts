import { ChangeStreamCallbacks } from '@utils/commons'
import { AnswerFromModel } from '@modules/questions/data/models/answers'
import { AnswerMapper } from '@modules/questions/data/mappers'
import { getSocketEmitter } from '@index'
import { IncrementUserAnswersCount } from '@modules/users'
import { sendNotification } from '@utils/modules/users/notifications'

export const AnswerChangeStreamCallbacks: ChangeStreamCallbacks<AnswerFromModel> = {
	created: async (answerModel) => {
		const answer = new AnswerMapper().mapFrom(answerModel)!

		await getSocketEmitter().emitCreated(`answers/${ answer.questionId }`, answer)

		await IncrementUserAnswersCount.execute({ id: answer.userId, value: 1 })
		// TODO: add to users answer list

		await sendNotification(answer.userId, {
			body: 'Your question has been answered. Go have a look',
			action: `/questions/${ answer.questionId }#${ answer.id }`
		})
		await sendNotification(answer.userId, {
			body: 'You asked a question and we\'ve answered! Go view all answers to your question',
			action: `/questions/${ answer.questionId }#${ answer.id }`
		}, 'New Answer')
	},
	updated: async (answerModel) => {
		const answer = new AnswerMapper().mapFrom(answerModel)!

		await getSocketEmitter().emitUpdated(`answers/${ answer.questionId }`, answer)
	},
	deleted: async (answerModel) => {

	}
}