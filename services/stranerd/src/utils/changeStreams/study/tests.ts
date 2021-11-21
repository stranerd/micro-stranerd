import { ChangeStreamCallbacks, Conditions } from '@utils/commons'
import { GetPastQuestions, PastQuestionType, TestEntity, TestFromModel, UpdateTest } from '@modules/study'
import { getSocketEmitter } from '@index'
import { getPercentage } from '@utils/functions'

export const TestChangeStreamCallbacks: ChangeStreamCallbacks<TestFromModel, TestEntity> = {
	created: async ({ after }) => {
		await getSocketEmitter().emitMineCreated('tests', after, after.userId)
		await getSocketEmitter().emitMineCreated(`tests/${after.id}`, after, after.userId)
	},
	updated: async ({ after, before, changes }) => {
		await getSocketEmitter().emitMineUpdated('tests', after, after.userId)
		await getSocketEmitter().emitMineUpdated(`tests/${after.id}`, after, after.userId)

		if (changes.done && !before.done && after.done) {
			// calculate score
			const { results: questions } = await GetPastQuestions.execute({
				where: [{ field: 'id', condition: Conditions.in, value: after.questions }]
			})

			const correct = questions
				.filter((q) => q.data.type === PastQuestionType.objective)
				.map((q) => q.data.type === PastQuestionType.objective && after.answers[q.id] === q.data.correctIndex)

			const score = getPercentage(correct.filter((c) => c).length, correct.length)
			await UpdateTest.execute({
				id: after.id,
				userId: after.userId,
				data: { score }
			})
		}
	},
	deleted: async ({ before }) => {
		await getSocketEmitter().emitMineDeleted('tests', before, before.userId)
		await getSocketEmitter().emitMineDeleted(`tests/${before.id}`, before, before.userId)
	}
}