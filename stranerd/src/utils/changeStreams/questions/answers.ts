import { ChangeStreamCallbacks } from '@utils/commons'
import { AnswerFromModel } from '@modules/questions/data/models/answers'
import { getSocketEmitter } from '@index'
import { IncrementUserAnswersCount, UpdateUserNerdScore } from '@modules/users'
import { sendNotification } from '@utils/modules/users/notifications'
import { AnswerEntity } from '@modules/questions/domain/entities'
import { ScoreRewards } from '@modules/users/domain/types/users'
import { DeleteAnswerComments, FindQuestion, MarkBestAnswer, ModifyAnswers, RemoveBestAnswer } from '@modules/questions'

export const AnswerChangeStreamCallbacks: ChangeStreamCallbacks<AnswerFromModel, AnswerEntity> = {
	created: async ({ after }) => {
		await getSocketEmitter().emitCreated(`answers/${ after.questionId }`, after)

		await IncrementUserAnswersCount.execute({ id: after.userId, value: 1 })
		await ModifyAnswers.execute({ id: after.id, userId: after.userId, add: true })

		await UpdateUserNerdScore.execute({
			userId: after.userId,
			amount: ScoreRewards.NewAnswer
		})

		await sendNotification(after.userId, {
			body: 'Your question has been answered. Go have a look',
			action: 'answers',
			data: { questionId: after.questionId, answerId: after.id }
		})
		await sendNotification(after.userId, {
			body: 'You asked a question and we\'ve answered! Go view all answers to your question',
			action: 'answers',
			data: { questionId: after.questionId, answerId: after.id }
		}, 'New Answer')
	},
	updated: async ({ after, changes }) => {
		await getSocketEmitter().emitUpdated(`answers/${ after.questionId }`, after)
		await getSocketEmitter().emitUpdated(`answers/${ after.id }`, after)

		if (changes.best) await UpdateUserNerdScore.execute({
			userId: after.userId,
			amount: after.best ? ScoreRewards.NewAnswer : -ScoreRewards.NewAnswer
		})

		if (!after.best && changes.votes && after.totalVotes >= 20) {
			const question = await FindQuestion.execute(after.questionId)
			const markBest = question && !question.isAnswered && !question.answers.find((a) => a.id === after.id)
			if (markBest) await MarkBestAnswer.execute({
				id: question!.id,
				answerId: after.id,
				userId: question!.userId
			})
		}
	},
	deleted: async ({ before }) => {
		await getSocketEmitter().emitDeleted(`answers/${ before.questionId }`, before)
		await getSocketEmitter().emitDeleted(`answers/${ before.id }`, before)

		await UpdateUserNerdScore.execute({
			userId: before.userId,
			amount: -ScoreRewards.NewAnswer
		})

		await IncrementUserAnswersCount.execute({ id: before.userId, value: -1 })
		await ModifyAnswers.execute({ id: before.id, userId: before.userId, add: false })

		if (before.best) {
			await RemoveBestAnswer.execute({ id: before.questionId, answerId: before.id })
			await UpdateUserNerdScore.execute({
				userId: before.userId,
				amount: -ScoreRewards.NewAnswer
			})
		}
		await DeleteAnswerComments.execute({ answerId: before.id })
	}
}