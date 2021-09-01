import { ChangeStreamCallbacks, Conditions } from '@utils/commons'
import { QuestionFromModel } from '@modules/questions/data/models/questions'
import { DeleteQuestionAnswers, UpdateTagsCount } from '@modules/questions'
import { addUserCoins } from '@utils/modules/users/transactions'
import { GetUsers, IncrementUserQuestionsCount } from '@modules/users'
import { sendNotification } from '@utils/modules/users/notifications'
import { getSocketEmitter } from '@index'
import { QuestionMapper } from '@modules/questions/data/mappers'
import { QuestionEntity } from '@modules/questions/domain/entities'

export const QuestionChangeStreamCallbacks: ChangeStreamCallbacks<QuestionFromModel, QuestionEntity> = {
	created: async ({ after }) => {
		const question = new QuestionMapper().mapFrom(after)!

		await getSocketEmitter().emitCreated('questions', question)

		await addUserCoins(question.userId, {
			bronze: 0 - question.coins,
			gold: 0
		}, 'You paid coins to ask a question!')

		await UpdateTagsCount.execute({
			tagIds: question.tags,
			increment: true
		})

		await IncrementUserQuestionsCount.execute({ id: question.userId, value: 1 })

		// TODO: add to users question list

		const tutors = await GetUsers.execute({
			where: [
				{ field: 'tutor.strongestSubject', value: question.subjectId, condition: Conditions.eq }
			]
		})
		await Promise.all([
			tutors.results.map((t) => t.id).map(async (id) => {
				await sendNotification(id, {
					body: 'A new question was just asked on Stranerd that you might be interested in. Go check it out',
					action: `/questions/${ question.id }`
				}, 'New Question')
			})
		])
	},
	updated: async ({ before, after, changes }) => {
		const beforeQuestion = new QuestionMapper().mapFrom(before)!
		const afterQuestion = new QuestionMapper().mapFrom(after)!
		await getSocketEmitter().emitUpdated('questions', afterQuestion)
		await getSocketEmitter().emitUpdated(`questions/${ afterQuestion.id }`, afterQuestion)

		if (changes.tags) {
			await UpdateTagsCount.execute({
				tagIds: beforeQuestion.tags,
				increment: false
			})
			await UpdateTagsCount.execute({
				tagIds: afterQuestion.tags,
				increment: true
			})
		}

		if (changes.coins) {
			const coins = afterQuestion.coins - afterQuestion.coins
			if (coins !== 0) await addUserCoins(afterQuestion.userId,
				{ bronze: 0 - coins, gold: 0 },
				coins > 0 ? 'You paid coins to upgrade a question' : 'You got refunded coins from downgrading a question'
			)
		}
	},
	deleted: async ({ before }) => {
		const question = new QuestionMapper().mapFrom(before)!

		await getSocketEmitter().emitDeleted('questions', { id: question.id })
		await getSocketEmitter().emitDeleted(`questions/${ question.id }`, { id: question.id })

		await DeleteQuestionAnswers.execute({ questionId: question.id })

		await UpdateTagsCount.execute({
			tagIds: question.tags,
			increment: false
		})

		await IncrementUserQuestionsCount.execute({ id: question.userId, value: -1 })

		// TODO: remove from users question list
	}
}