import { ChangeStreamCallbacks, EventTypes } from '@utils/commons'
import { AnswersUseCases, QuestionEntity, QuestionFromModel } from '@modules/questions'
import { BadgesUseCases, CountStreakBadges, ScoreRewards, UserMeta, UsersUseCases } from '@modules/users'
import { getSocketEmitter } from '@index'
import { publishers } from '@utils/events'

export const QuestionChangeStreamCallbacks: ChangeStreamCallbacks<QuestionFromModel, QuestionEntity> = {
	created: async ({ after }) => {
		await getSocketEmitter().emitCreated('questions/questions', after)
		await getSocketEmitter().emitCreated(`questions/questions/${after.id}`, after)

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
		await getSocketEmitter().emitUpdated('questions/questions', after)
		await getSocketEmitter().emitUpdated(`questions/questions/${after.id}`, after)

		if (changes.attachments) {
			const oldAttachments = before.attachments.filter((t) => !after.attachments.find((a) => a.path === t.path))
			await Promise.all(
				oldAttachments.map(async (attachment) => await publishers[EventTypes.DELETEFILE].publish(attachment))
			)
		}
	},
	deleted: async ({ before }) => {
		await getSocketEmitter().emitDeleted('questions/questions', before)
		await getSocketEmitter().emitDeleted(`questions/questions/${before.id}`, before)

		await AnswersUseCases.deleteQuestionAnswers(before.id)

		await UsersUseCases.updateNerdScore({
			userId: before.user.id,
			amount: -ScoreRewards.NewQuestion
		})

		await UsersUseCases.incrementMeta({ id: before.user.id, value: -1, property: UserMeta.questions })

		await Promise.all(
			before.attachments.map(async (attachment) => await publishers[EventTypes.DELETEFILE].publish(attachment))
		)

		await BadgesUseCases.recordCountStreak({
			userId: before.user.id,
			activity: CountStreakBadges.NewQuestion,
			add: false
		})
	}
}