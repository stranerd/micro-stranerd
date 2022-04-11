import { appInstance, ChangeStreamCallbacks, Conditions, DelayedJobs } from '@utils/commons'
import { TestEntity, TestFromModel, TestType, UpdateTest, UpdateTestTaskIds } from '@modules/study'
import { GetPastQuestions, PastQuestionType } from '@modules/school'
import { getSocketEmitter } from '@index'
import { getPercentage } from '@utils/functions'
import { ScoreRewards, UpdateUserNerdScore } from '@modules/users'

export const TestChangeStreamCallbacks: ChangeStreamCallbacks<TestFromModel, TestEntity> = {
	created: async ({ after }) => {
		await getSocketEmitter().emitPathCreated('study/tests', after, after.userId)
		await getSocketEmitter().emitPathCreated(`study/tests/${after.id}`, after, after.userId)

		if (after.data.type === TestType.timed) {
			const delay = after.data.time * 60 * 1000
			const taskId = await appInstance.job.addDelayedJob({
				type: DelayedJobs.TestTimer,
				data: { testId: after.id, userId: after.userId }
			}, delay)
			await UpdateTestTaskIds.execute({ testId: after.id, taskIds: [taskId] })
		}
	},
	updated: async ({ after, before, changes }) => {
		await getSocketEmitter().emitPathUpdated('study/tests', after, after.userId)
		await getSocketEmitter().emitPathUpdated(`study/tests/${after.id}`, after, after.userId)

		if (changes.done && !before.done && after.done) {
			if (after.data.type === TestType.timed) await UpdateUserNerdScore.execute({
				userId: after.userId,
				amount: ScoreRewards.CompleteTest
			})
			if (after.questionType === PastQuestionType.objective) {
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
				await Promise.all(after.taskIds.map(appInstance.job.removeDelayedJob))
			}
		}
	},
	deleted: async ({ before }) => {
		await getSocketEmitter().emitPathDeleted('study/tests', before, before.userId)
		await getSocketEmitter().emitPathDeleted(`study/tests/${before.id}`, before, before.userId)

		await Promise.all(before.taskIds.map(appInstance.job.removeDelayedJob))
	}
}