import { ChangeStreamCallbacks, EventTypes } from '@utils/commons'
import {
	AnswerEntity,
	AnswerFromModel,
	DeleteAnswerComments,
	DeleteAnswerVotes,
	FindQuestion,
	UpdateBestAnswer,
	UpdateQuestionsAnswers
} from '@modules/questions'
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
import { publishers } from '@utils/events'

getSocketEmitter().register('questions/answers', getSocketEmitter().quickRegisters.isOpen)
export const AnswerChangeStreamCallbacks: ChangeStreamCallbacks<AnswerFromModel, AnswerEntity> = {
	created: async ({ after }) => {
		await getSocketEmitter().emitCreated('questions/answers', after)
		await getSocketEmitter().emitCreated(`questions/answers/${after.id}`, after)

		await IncrementUserMetaCount.execute({ id: after.userId, value: 1, property: UserMeta.answers })
		await UpdateQuestionsAnswers.execute({
			questionId: after.questionId,
			answerId: after.id,
			userId: after.userId,
			add: true
		})

		await UpdateUserNerdScore.execute({
			userId: after.userId,
			amount: ScoreRewards.NewAnswer
		})

		const question = await FindQuestion.execute(after.questionId)
		if (question) {
			await sendNotification(question.userId, {
				title: 'New Answer',
				body: 'Your question has been answered. Go have a look',
				action: 'answers',
				data: { questionId: after.questionId, answerId: after.id }
			}, true)
		}

		await RecordCountStreak.execute({
			userId: after.userId,
			activity: CountStreakBadges.NewAnswer,
			add: true
		})
	},
	updated: async ({ before, after, changes }) => {
		await getSocketEmitter().emitUpdated('questions/answers', after)
		await getSocketEmitter().emitUpdated(`questions/answers/${after.id}`, after)

		if (changes.best) {
			const question = await FindQuestion.execute(after.questionId)
			await UpdateUserNerdScore.execute({
				userId: after.userId,
				amount: after.best ? ScoreRewards.NewAnswer : -ScoreRewards.NewAnswer
			})
			await IncrementUserMetaCount.execute({
				id: before.userId,
				value: after.best ? 1 : -1,
				property: UserMeta.bestAnswers
			})
			await RecordCountStreak.execute({
				userId: after.userId,
				activity: CountStreakBadges.GetBestAnswer,
				add: true
			})
			if (question) await RecordCountStreak.execute({
				userId: question.userId,
				activity: CountStreakBadges.GiveBestAnswer,
				add: true
			})
		}

		if (!after.best && changes.votes && after.totalVotes >= 20) {
			const question = await FindQuestion.execute(after.questionId)
			const markBest = question && !question.isAnswered && !question.answers.find((a) => a.id === after.id)
			if (markBest) await UpdateBestAnswer.execute({
				id: question!.id,
				answerId: after.id,
				userId: question!.userId,
				add: true
			})
		}

		if (changes.attachments) {
			const oldAttachments = before.attachments.filter((t) => !after.attachments.find((a) => a.path === t.path))
			await Promise.all(
				oldAttachments.map(async (attachment) => await publishers[EventTypes.DELETEFILE].publish(attachment))
			)
		}
	},
	deleted: async ({ before }) => {
		await getSocketEmitter().emitDeleted('questions/answers', before)
		await getSocketEmitter().emitDeleted(`questions/answers/${before.id}`, before)

		await UpdateUserNerdScore.execute({
			userId: before.userId,
			amount: -ScoreRewards.NewAnswer
		})

		await IncrementUserMetaCount.execute({ id: before.userId, value: -1, property: UserMeta.answers })
		await UpdateQuestionsAnswers.execute({
			questionId: before.questionId,
			answerId: before.id,
			userId: before.userId,
			add: false
		})

		await Promise.all([
			DeleteAnswerComments.execute(before.id),
			DeleteAnswerVotes.execute(before.id)
		])

		await Promise.all(
			before.attachments.map(async (attachment) => await publishers[EventTypes.DELETEFILE].publish(attachment))
		)

		await RecordCountStreak.execute({
			userId: before.userId,
			activity: CountStreakBadges.NewAnswer,
			add: false
		})

		if (before.best) {
			await UpdateUserNerdScore.execute({
				userId: before.userId,
				amount: -ScoreRewards.BestAnswer
			})
			await IncrementUserMetaCount.execute({ id: before.userId, value: -1, property: UserMeta.bestAnswers })
			const question = await FindQuestion.execute(before.questionId)
			if (question) await UpdateBestAnswer.execute({
				id: question.id,
				userId: question.userId,
				answerId: before.id,
				add: false
			})
		}
	}
}