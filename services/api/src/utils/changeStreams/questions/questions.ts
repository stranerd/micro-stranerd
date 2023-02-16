import { PlanDataType, WalletsUseCases } from '@modules/payment'
import { AnswersUseCases, QuestionEntity, QuestionFromModel } from '@modules/questions'
import { SetSaved, SetsUseCases } from '@modules/study'
import { BadgesUseCases, CountStreakBadges, ScoreRewards, UserMeta, UsersUseCases } from '@modules/users'
import { ChangeStreamCallbacks } from '@utils/app/package'
import { appInstance } from '@utils/app/types'
import { publishers } from '@utils/events'

export const QuestionChangeStreamCallbacks: ChangeStreamCallbacks<QuestionFromModel, QuestionEntity> = {
	created: async ({ after }) => {
		await appInstance.listener.created('questions/questions', after)
		await appInstance.listener.created(`questions/questions/${after.id}`, after)

		await WalletsUseCases.updateSubscriptionData({ userId: after.user.id, key: PlanDataType.questions, value: -1 })

		await UsersUseCases.incrementMeta({ id: after.user.id, value: 1, property: UserMeta.questions })

		await UsersUseCases.updateNerdScore({
			userId: after.user.id,
			amount: ScoreRewards.NewQuestion
		})

		await BadgesUseCases.recordCountStreak({
			userId: after.user.id,
			activity: CountStreakBadges.NewQuestion,
			add: true
		})
	},
	updated: async ({ before, after, changes }) => {
		await appInstance.listener.updated('questions/questions', after)
		await appInstance.listener.updated(`questions/questions/${after.id}`, after)

		if (changes.attachments) {
			const oldAttachments = before.attachments.filter((t) => !after.attachments.find((a) => a.path === t.path))
			await Promise.all(
				oldAttachments.map(async (attachment) => await publishers.DELETEFILE.publish(attachment))
			)
		}
	},
	deleted: async ({ before }) => {
		await appInstance.listener.deleted('questions/questions', before)
		await appInstance.listener.deleted(`questions/questions/${before.id}`, before)
		await SetsUseCases.removeProp({ prop: SetSaved.questions, value: before.id })

		await AnswersUseCases.deleteQuestionAnswers(before.id)

		await UsersUseCases.updateNerdScore({
			userId: before.user.id,
			amount: -ScoreRewards.NewQuestion
		})

		await UsersUseCases.incrementMeta({ id: before.user.id, value: -1, property: UserMeta.questions })

		await Promise.all(
			before.attachments.map(async (attachment) => await publishers.DELETEFILE.publish(attachment))
		)

		await BadgesUseCases.recordCountStreak({
			userId: before.user.id,
			activity: CountStreakBadges.NewQuestion,
			add: false
		})
	}
}