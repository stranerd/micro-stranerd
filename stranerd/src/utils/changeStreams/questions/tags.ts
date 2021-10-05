import { ChangeStreamCallbacks } from '@utils/commons'
import { GetQuestions, TagEntity, TagFromModel } from '@modules/questions'
import { getSocketEmitter } from '@index'
import { CountStreakBadges, RecordCountStreak } from '@modules/users'

export const TagChangeStreamCallbacks: ChangeStreamCallbacks<TagFromModel, TagEntity> = {
	created: async ({ after }) => {
		await getSocketEmitter().emitOpenCreated('tags', after)
		await getSocketEmitter().emitOpenCreated(`tags/${after.id}`, after)

		const questions = await GetQuestions.execute({
			where: [{ field: 'tags', value: after.name }],
			limit: 1,
			sort: { field: 'createdAt', order: 1 }
		})
		const question = questions.results[0]
		if (question) {
			await RecordCountStreak.execute({
				userId: question.userId,
				activity: CountStreakBadges.NewTag,
				add: true
			})
		}
	},
	updated: async ({ after }) => {
		await getSocketEmitter().emitOpenUpdated('tags', after)
		await getSocketEmitter().emitOpenUpdated(`tags/${after.id}`, after)
	},
	deleted: async ({ before }) => {
		await getSocketEmitter().emitOpenDeleted('tags', before)
		await getSocketEmitter().emitOpenDeleted(`tags/${before.id}`, before)
	}
}