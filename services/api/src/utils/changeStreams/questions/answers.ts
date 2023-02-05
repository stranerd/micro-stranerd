import { ChangeStreamCallbacks, Validation } from '@utils/app/package'
import { AnswerEntity, AnswerFromModel, QuestionsUseCases } from '@modules/questions'
import { getSocketEmitter } from '@index'
import {
	BadgesUseCases,
	CountStreakBadges,
	NotificationType,
	ScoreRewards,
	UserMeta,
	UsersUseCases
} from '@modules/users'
import { sendNotification } from '@utils/modules/users/notifications'
import { publishers } from '@utils/events'
import { CommentsUseCases, InteractionEntities, LikesUseCases } from '@modules/interactions'
import { Currencies, TransactionStatus, TransactionsUseCases, TransactionType } from '@modules/payment'

export const AnswerChangeStreamCallbacks: ChangeStreamCallbacks<AnswerFromModel, AnswerEntity> = {
	created: async ({ after }) => {
		await getSocketEmitter().emitCreated('questions/answers', after)
		await getSocketEmitter().emitCreated(`questions/answers/${after.id}`, after)

		await UsersUseCases.incrementMeta({ id: after.user.id, value: 1, property: UserMeta.answers })
		await QuestionsUseCases.updateAnswers({
			questionId: after.questionId,
			answerId: after.id,
			userId: after.user.id,
			add: true
		})

		await UsersUseCases.updateNerdScore({
			userId: after.user.id,
			amount: ScoreRewards.NewAnswer
		})

		const question = await QuestionsUseCases.find(after.questionId)
		if (question) {
			await sendNotification([question.user.id], {
				title: `${question.user.bio.fullName} answered your question`,
				body: Validation.extractTextFromHTML(after.body),
				data: { type: NotificationType.NewAnswer, questionId: after.questionId, answerId: after.id },
				sendEmail: true
			})
		}

		await BadgesUseCases.recordCountStreak({
			userId: after.user.id,
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
				userId: after.user.id,
				amount: after.best ? ScoreRewards.NewAnswer : -ScoreRewards.NewAnswer
			})
			await UsersUseCases.incrementMeta({
				id: before.user.id,
				value: after.best ? 1 : -1,
				property: UserMeta.bestAnswers
			})
			await BadgesUseCases.recordCountStreak({
				userId: after.user.id,
				activity: CountStreakBadges.GetBestAnswer,
				add: true
			})
			if (question) await BadgesUseCases.recordCountStreak({
				userId: question.user.id,
				activity: CountStreakBadges.GiveBestAnswer,
				add: true
			})
			if (after.best) await TransactionsUseCases.create({
				title: 'Answer selected as best', userId: after.user.id, email: after.user.bio.email,
				status: TransactionStatus.fulfilled, amount: 200, currency: Currencies.NGN,
				data: { type: TransactionType.BestAnswer, questionId: after.questionId, answerId: after.id }
			})
		}

		if (!after.best && changes.meta?.likes && after.meta.likes >= 20) {
			const question = await QuestionsUseCases.find(after.questionId)
			const markBest = question && !question.isAnswered && !question.answers.find((a) => a.id === after.id)
			if (markBest) await QuestionsUseCases.updateBestAnswer({
				id: question!.id,
				answerId: after.id,
				userId: question!.user.id,
				add: true
			})
		}

		if (changes.attachments) {
			const oldAttachments = before.attachments.filter((t) => !after.attachments.find((a) => a.path === t.path))
			await Promise.all(
				oldAttachments.map(async (attachment) => await publishers.DELETEFILE.publish(attachment))
			)
		}
	},
	deleted: async ({ before }) => {
		await getSocketEmitter().emitDeleted('questions/answers', before)
		await getSocketEmitter().emitDeleted(`questions/answers/${before.id}`, before)

		await UsersUseCases.updateNerdScore({
			userId: before.user.id,
			amount: -ScoreRewards.NewAnswer
		})

		await UsersUseCases.incrementMeta({ id: before.user.id, value: -1, property: UserMeta.answers })
		await QuestionsUseCases.updateAnswers({
			questionId: before.questionId,
			answerId: before.id,
			userId: before.user.id,
			add: false
		})

		await Promise.all([
			CommentsUseCases.deleteEntityComments({ type: InteractionEntities.answers, id: before.id }),
			LikesUseCases.deleteEntityLikes({ type: InteractionEntities.answers, id: before.id })
		])

		await Promise.all(
			before.attachments.map(async (attachment) => await publishers.DELETEFILE.publish(attachment))
		)

		await BadgesUseCases.recordCountStreak({
			userId: before.user.id,
			activity: CountStreakBadges.NewAnswer,
			add: false
		})

		if (before.best) {
			await UsersUseCases.updateNerdScore({
				userId: before.user.id,
				amount: -ScoreRewards.BestAnswer
			})
			await UsersUseCases.incrementMeta({ id: before.user.id, value: -1, property: UserMeta.bestAnswers })
			const question = await QuestionsUseCases.find(before.questionId)
			if (question) await QuestionsUseCases.updateBestAnswer({
				id: question.id,
				userId: question.user.id,
				answerId: before.id,
				add: false
			})
		}
	}
}