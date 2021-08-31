import { ChangeStreamCallbacks, Conditions } from '@utils/commons'
import { QuestionFromModel } from '@modules/questions/data/models/questions'
import { DeleteQuestionAnswers, UpdateTagsCount } from '@modules/questions'
import { addUserCoins } from '@utils/modules/users/transactions'
import { GetUsers, IncrementUserQuestionsCount } from '@modules/users'
import { sendNotification } from '@utils/modules/users/notifications'
import { getSocketEmitter } from '@index'
import { QuestionMapper } from '@modules/questions/data/mappers'

export const QuestionChangeStreamCallbacks: ChangeStreamCallbacks<QuestionFromModel> = {
	created: async (questionModel) => {
		const question = new QuestionMapper().mapFrom(questionModel)!

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
	updated: async (questionModel) => {
		const question = new QuestionMapper().mapFrom(questionModel)!
		await getSocketEmitter().emitUpdated('questions', question)
		await getSocketEmitter().emitUpdated(`questions/${ question.id }`, question)
	},
	deleted: async (questionModel) => {
		await getSocketEmitter().emitDeleted('questions', { id: questionModel._id })
		await getSocketEmitter().emitDeleted(`questions/${ questionModel._id }`, { id: questionModel._id })

		await DeleteQuestionAnswers.execute({ questionId: questionModel._id })
	}
}