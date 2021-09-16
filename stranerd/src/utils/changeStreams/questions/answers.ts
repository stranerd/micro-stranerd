import { ChangeStreamCallbacks } from '@utils/commons'
import {
	AnswerEntity,
	AnswerFromModel,
	DeleteAnswerComments,
	FindQuestion,
	MarkBestAnswer,
	ModifyAnswers,
	RemoveBestAnswer
} from '@modules/questions'
import { getSocketEmitter } from '@index'
import { IncrementUserMetaCount, ScoreRewards, UpdateUserNerdScore, UpdateUserTags } from '@modules/users'
import { sendNotification } from '@utils/modules/users/notifications'

export const AnswerChangeStreamCallbacks: ChangeStreamCallbacks<AnswerFromModel, AnswerEntity> = {
	created: async ({ after }) => {
		await getSocketEmitter().emitOpenCreated('answers', after)
		await getSocketEmitter().emitOpenCreated(`answers/${after.id}`, after)

		await IncrementUserMetaCount.execute({ id: after.userId, value: 1, property: 'answers' })
		await ModifyAnswers.execute({ id: after.id, userId: after.userId, add: true })

		await UpdateUserNerdScore.execute({
			userId: after.userId,
			amount: ScoreRewards.NewAnswer
		})
		await UpdateUserTags.execute({
			userId: after.userId,
			tags: after.tags,
			add: true
		})

		const question = await FindQuestion.execute(after.questionId)
		if (question) {
			await sendNotification(question.userId, {
				body: 'Your question has been answered. Go have a look',
				action: 'answers',
				data: { questionId: after.questionId, answerId: after.id }
			})
			await sendNotification(question.userId, {
				body: 'You asked a question and we\'ve answered! Go view all answers to your question',
				action: 'answers',
				data: { questionId: after.questionId, answerId: after.id }
			}, 'New Answer')
		}
	},
	updated: async ({ before, after, changes }) => {
		await getSocketEmitter().emitOpenUpdated('answers', after)
		await getSocketEmitter().emitOpenUpdated(`answers/${after.id}`, after)

		if (changes.best) {
			await UpdateUserNerdScore.execute({
				userId: after.userId,
				amount: after.best ? ScoreRewards.NewAnswer : -ScoreRewards.NewAnswer
			})
			await IncrementUserMetaCount.execute({
				id: before.userId,
				value: after.best ? 1 : -1,
				property: 'bestAnswers'
			})
		}

		if (changes.tags) {
			const oldTags = before.tags.filter((t) => !after.tags.includes(t))
			const newTags = after.tags.filter((t) => !before.tags.includes(t))
			await UpdateUserTags.execute({
				userId: before.userId,
				tags: oldTags,
				add: false
			})
			await UpdateUserTags.execute({
				userId: after.userId,
				tags: newTags,
				add: true
			})
		}

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
		await getSocketEmitter().emitOpenDeleted('answers', before)
		await getSocketEmitter().emitOpenDeleted(`answers/${before.id}`, before)

		await UpdateUserNerdScore.execute({
			userId: before.userId,
			amount: -ScoreRewards.NewAnswer
		})
		await UpdateUserTags.execute({
			userId: before.userId,
			tags: before.tags,
			add: false
		})

		await IncrementUserMetaCount.execute({ id: before.userId, value: -1, property: 'answers' })
		await ModifyAnswers.execute({ id: before.id, userId: before.userId, add: false })

		if (before.best) {
			await RemoveBestAnswer.execute({ id: before.questionId, answerId: before.id })
			await UpdateUserNerdScore.execute({
				userId: before.userId,
				amount: -ScoreRewards.NewAnswer
			})
			await IncrementUserMetaCount.execute({ id: before.userId, value: -1, property: 'bestAnswers' })
		}
		await DeleteAnswerComments.execute({ answerId: before.id })
	}
}