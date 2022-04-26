import { ChangeStreamCallbacks, EventTypes } from '@utils/commons'
import {
	AnswerCommentsUseCases,
	AnswerEntity,
	AnswerFromModel,
	AnswerUpvotesUseCases,
	QuestionsUseCases
} from '@modules/questions'
import { getSocketEmitter } from '@index'
import { BadgesUseCases, CountStreakBadges, ScoreRewards, UserMeta, UsersUseCases } from '@modules/users'
import { sendNotification } from '@utils/modules/users/notifications'
import { publishers } from '@utils/events'

export const AnswerChangeStreamCallbacks: ChangeStreamCallbacks<AnswerFromModel, AnswerEntity> = {
	created: async ({ after }) => {
		await getSocketEmitter().emitCreated('questions/answers', after)
		await getSocketEmitter().emitCreated(`questions/answers/${after.id}`, after)

		await UsersUseCases.incrementMeta({ id: after.userId, value: 1, property: UserMeta.answers })
		await QuestionsUseCases.updateAnswers({
			questionId: after.questionId,
			answerId: after.id,
			userId: after.userId,
			add: true
		})

		await UsersUseCases.updateNerdScore({
			userId: after.userId,
			amount: ScoreRewards.NewAnswer
		})

		const question = await QuestionsUseCases.find(after.questionId)
		if (question) {
			await sendNotification(question.userId, {
				title: 'New Answer',
				body: 'Your question has been answered. Go have a look',
				action: 'answers',
				data: { questionId: after.questionId, answerId: after.id }
			}, true)
		}

		await BadgesUseCases.recordCountStreak({
			userId: after.userId,
			activity: CountStreakBadges.NewAnswer,
			add: true
		})
	},
	updated: async ({ before, after, changes }) => {
		await getSocketEmitter().emitUpdated('questions/answers', after)
		await getSocketEmitter().emitUpdated(`questions/answers/${after.id}`, after)

		if (changes.best) {
			const question = await QuestionsUseCases.find(after.questionId)
			await UsersUseCases.updateNerdScore({
				userId: after.userId,
				amount: after.best ? ScoreRewards.NewAnswer : -ScoreRewards.NewAnswer
			})
			await UsersUseCases.incrementMeta({
				id: before.userId,
				value: after.best ? 1 : -1,
				property: UserMeta.bestAnswers
			})
			await BadgesUseCases.recordCountStreak({
				userId: after.userId,
				activity: CountStreakBadges.GetBestAnswer,
				add: true
			})
			if (question) await BadgesUseCases.recordCountStreak({
				userId: question.userId,
				activity: CountStreakBadges.GiveBestAnswer,
				add: true
			})
		}

		if (!after.best && changes.votes && after.totalVotes >= 20) {
			const question = await QuestionsUseCases.find(after.questionId)
			const markBest = question && !question.isAnswered && !question.answers.find((a) => a.id === after.id)
			if (markBest) await QuestionsUseCases.updateBestAnswer({
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

		await UsersUseCases.updateNerdScore({
			userId: before.userId,
			amount: -ScoreRewards.NewAnswer
		})

		await UsersUseCases.incrementMeta({ id: before.userId, value: -1, property: UserMeta.answers })
		await QuestionsUseCases.updateAnswers({
			questionId: before.questionId,
			answerId: before.id,
			userId: before.userId,
			add: false
		})

		await Promise.all([
			AnswerCommentsUseCases.deleteAnswerComments(before.id),
			AnswerUpvotesUseCases.deleteAnswerVotes(before.id)
		])

		await Promise.all(
			before.attachments.map(async (attachment) => await publishers[EventTypes.DELETEFILE].publish(attachment))
		)

		await BadgesUseCases.recordCountStreak({
			userId: before.userId,
			activity: CountStreakBadges.NewAnswer,
			add: false
		})

		if (before.best) {
			await UsersUseCases.updateNerdScore({
				userId: before.userId,
				amount: -ScoreRewards.BestAnswer
			})
			await UsersUseCases.incrementMeta({ id: before.userId, value: -1, property: UserMeta.bestAnswers })
			const question = await QuestionsUseCases.find(before.questionId)
			if (question) await QuestionsUseCases.updateBestAnswer({
				id: question.id,
				userId: question.userId,
				answerId: before.id,
				add: false
			})
		}
	}
}