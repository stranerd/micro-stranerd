import { ChangeStreamCallbacks, EventTypes } from '@utils/commons'
import { DeleteQuestionAnswers, QuestionEntity, QuestionFromModel } from '@modules/questions'
import {
	CountStreakBadges,
	IncrementUserMetaCount,
	RecordCountStreak,
	ScoreRewards,
	UpdateUserNerdScore,
	UserMeta
} from '@modules/users'
import { getSocketEmitter } from '@index'
import { publishers } from '@utils/events'

export const QuestionChangeStreamCallbacks: ChangeStreamCallbacks<QuestionFromModel, QuestionEntity> = {
	created: async ({ after }) => {
		await getSocketEmitter().emitCreated('questions/questions', after)
		await getSocketEmitter().emitCreated(`questions/questions/${after.id}`, after)

		await IncrementUserMetaCount.execute({ id: after.userId, value: 1, property: UserMeta.questions })

		await UpdateUserNerdScore.execute({
			userId: after.userId,
			amount: ScoreRewards.NewQuestion
		})

		await RecordCountStreak.execute({
			userId: after.userId,
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

		await DeleteQuestionAnswers.execute(before.id)

		await UpdateUserNerdScore.execute({
			userId: before.userId,
			amount: -ScoreRewards.NewQuestion
		})

		await IncrementUserMetaCount.execute({ id: before.userId, value: -1, property: UserMeta.questions })

		await Promise.all(
			before.attachments.map(async (attachment) => await publishers[EventTypes.DELETEFILE].publish(attachment))
		)

		await RecordCountStreak.execute({
			userId: before.userId,
			activity: CountStreakBadges.NewQuestion,
			add: false
		})
	}
}