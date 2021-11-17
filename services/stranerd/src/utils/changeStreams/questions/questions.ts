import { AuthApps, ChangeStreamCallbacks, EventTypes } from '@utils/commons'
import {
	DeleteQuestionAnswers,
	QuestionEntity,
	QuestionFromModel,
	UpdateQuestionAnswersTags,
	UpdateTagsCount
} from '@modules/questions'
import {
	CountStreakBadges,
	GetUsers,
	IncrementUserMetaCount,
	RecordCountStreak,
	ScoreRewards,
	UpdateUserNerdScore
} from '@modules/users'
import { sendNotification } from '@utils/modules/users/notifications'
import { getSocketEmitter } from '@index'
import { publishers } from '@utils/events'

export const QuestionChangeStreamCallbacks: ChangeStreamCallbacks<QuestionFromModel, QuestionEntity> = {
	created: async ({ after }) => {
		await getSocketEmitter().emitOpenCreated('questions', after)
		await getSocketEmitter().emitOpenCreated(`questions/${after.id}`, after)

		await UpdateTagsCount.execute({
			tagNames: after.tags,
			increment: true
		})

		await IncrementUserMetaCount.execute({ id: after.userId, value: 1, property: 'questions' })

		await UpdateUserNerdScore.execute({
			userId: after.userId,
			amount: ScoreRewards.NewQuestion
		})

		await RecordCountStreak.execute({
			userId: after.userId,
			activity: CountStreakBadges.NewQuestion,
			add: true
		})

		const tutors = await GetUsers.execute({
			where: [
				{ field: `roles.${AuthApps.Stranerd}.isTutor`, value: true },
				{ field: 'tutor.strongestSubject', value: after.subjectId }
			]
		})
		await Promise.all([
			tutors.results.map((t) => t.id).map(async (id) => {
				await sendNotification(id, {
					body: 'A new question was just asked that you might be interested in. Go check it out',
					action: 'questions',
					data: { questionId: after.id }
				}, 'New Question')
			})
		])
	},
	updated: async ({ before, after, changes }) => {
		await getSocketEmitter().emitOpenUpdated('questions', after)
		await getSocketEmitter().emitOpenUpdated(`questions/${after.id}`, after)

		if (changes.tags) {
			const oldTags = before.tags.filter((t) => !after.tags.includes(t))
			const newTags = after.tags.filter((t) => !before.tags.includes(t))
			await UpdateTagsCount.execute({ tagNames: oldTags, increment: false })
			await UpdateTagsCount.execute({ tagNames: newTags, increment: true })
			await UpdateQuestionAnswersTags.execute({ questionId: after.id, tags: after.tags })
		}

		if (changes.attachments) {
			const oldAttachments = before.attachments.filter((t) => !after.attachments.find((a) => a.path === t.path))
			await Promise.all(
				oldAttachments.map(async (attachment) => await publishers[EventTypes.DELETEFILE].publish(attachment))
			)
		}
	},
	deleted: async ({ before }) => {
		await getSocketEmitter().emitOpenDeleted('questions', before)
		await getSocketEmitter().emitOpenDeleted(`questions/${before.id}`, before)

		await DeleteQuestionAnswers.execute({ questionId: before.id })

		await UpdateTagsCount.execute({
			tagNames: before.tags,
			increment: false
		})

		await UpdateUserNerdScore.execute({
			userId: before.userId,
			amount: -ScoreRewards.NewQuestion
		})

		await IncrementUserMetaCount.execute({ id: before.userId, value: -1, property: 'questions' })

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