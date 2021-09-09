import { ChangeStreamCallbacks, Conditions } from '@utils/commons'
import { QuestionFromModel } from '@modules/questions/data/models/questions'
import { DeleteQuestionAnswers, UpdateQuestionAnswersTags, UpdateTagsCount } from '@modules/questions'
import { addUserCoins } from '@utils/modules/users/transactions'
import { ScoreRewards } from '@modules/users/domain/types/users'
import { GetUsers, IncrementUserQuestionsCount, UpdateUserNerdScore } from '@modules/users'
import { sendNotification } from '@utils/modules/users/notifications'
import { getSocketEmitter } from '@index'
import { QuestionEntity } from '@modules/questions/domain/entities'

export const QuestionChangeStreamCallbacks: ChangeStreamCallbacks<QuestionFromModel, QuestionEntity> = {
	created: async ({ after }) => {
		await getSocketEmitter().emitCreated('questions', after)

		await addUserCoins(after.userId, {
			bronze: 0 - after.coins,
			gold: 0
		}, 'You paid coins to ask a question!')

		await UpdateTagsCount.execute({
			tagNames: after.tags,
			increment: true
		})

		await IncrementUserQuestionsCount.execute({ id: after.userId, value: 1 })

		await UpdateUserNerdScore.execute({
			userId: after.userId,
			amount: ScoreRewards.NewQuestion
		})

		const tutors = await GetUsers.execute({
			where: [
				{ field: 'tutor.strongestSubject', value: after.subjectId, condition: Conditions.eq }
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
		await getSocketEmitter().emitUpdated('questions', after)
		await getSocketEmitter().emitUpdated(`questions/${ after.id }`, after)

		if (changes.tags) {
			const oldTags = before.tags.filter((t) => !after.tags.includes(t))
			const newTags = after.tags.filter((t) => !before.tags.includes(t))
			await UpdateTagsCount.execute({ tagNames: oldTags, increment: false })
			await UpdateTagsCount.execute({ tagNames: newTags, increment: true })
			await UpdateQuestionAnswersTags.execute({ questionId: after.id, tags: after.tags })
		}

		if (changes.coins) {
			const coins = after.coins - after.coins
			if (coins !== 0) await addUserCoins(after.userId,
				{ bronze: 0 - coins, gold: 0 },
				coins > 0 ? 'You paid coins to upgrade a question' : 'You got refunded coins from downgrading a question'
			)
		}

	},
	deleted: async ({ before }) => {
		await getSocketEmitter().emitDeleted('questions', before)
		await getSocketEmitter().emitDeleted(`questions/${ before.id }`, before)

		await DeleteQuestionAnswers.execute({ questionId: before.id })

		await UpdateTagsCount.execute({
			tagNames: before.tags,
			increment: false
		})

		await UpdateUserNerdScore.execute({
			userId: before.userId,
			amount: -ScoreRewards.NewQuestion
		})

		await IncrementUserQuestionsCount.execute({ id: before.userId, value: -1 })
	}
}