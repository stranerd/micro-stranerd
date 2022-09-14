import { ChangeStreamCallbacks, Conditions } from '@utils/app/package'
import { appInstance, DelayedEvent, DelayedJobs } from '@utils/app/types'
import { TestEntity, TestFromModel, TestsUseCases, TestType } from '@modules/study'
import { PastQuestionsUseCases, PastQuestionType } from '@modules/school'
import { getSocketEmitter } from '@index'
import { getPercentage } from '@utils/functions'
import { ScoreRewards, UsersUseCases } from '@modules/users'

export const TestChangeStreamCallbacks: ChangeStreamCallbacks<TestFromModel, TestEntity> = {
	created: async ({ after }) => {
		await getSocketEmitter().emitCreated(`study/tests/${after.userId}`, after)
		await getSocketEmitter().emitCreated(`study/tests/${after.id}/${after.userId}`, after)

		if (after.data.type === TestType.timed) {
			const delay = after.data.time * 60 * 1000
			const taskId = await appInstance.job.addDelayedJob<DelayedEvent>({
				type: DelayedJobs.TestTimer,
				data: { testId: after.id, userId: after.userId }
			}, delay)
			await TestsUseCases.updateTaskIds({ testId: after.id, taskIds: [taskId] })
		}
	},
	updated: async ({ after, before, changes }) => {
		await getSocketEmitter().emitUpdated(`study/tests/${after.userId}`, after)
		await getSocketEmitter().emitUpdated(`study/tests/${after.id}/${after.userId}`, after)

		if (changes.done && !before.done && after.done) {
			if (after.data.type === TestType.timed) await UsersUseCases.updateNerdScore({
				userId: after.userId,
				amount: ScoreRewards.CompleteTest
			})
			if (after.questionType === PastQuestionType.objective) {
				// calculate score
				const { results: questions } = await PastQuestionsUseCases.get({
					where: [{ field: 'id', condition: Conditions.in, value: after.questions }]
				})

				const correct = questions
					.filter((q) => q.data.type === PastQuestionType.objective)
					.map((q) => q.data.type === PastQuestionType.objective && after.answers[q.id] === q.data.correctIndex)

				const score = getPercentage(correct.filter((c) => c).length, correct.length)
				await TestsUseCases.update({
					id: after.id,
					userId: after.userId,
					data: { score }
				})
				await Promise.all(after.taskIds.map(appInstance.job.removeDelayedJob))
			}
		}
	},
	deleted: async ({ before }) => {
		await getSocketEmitter().emitDeleted(`study/tests/${before.userId}`, before)
		await getSocketEmitter().emitDeleted(`study/tests/${before.id}/${before.userId}`, before)

		await Promise.all(before.taskIds.map(appInstance.job.removeDelayedJob))
	}
}