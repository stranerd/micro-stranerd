import { ChangeStreamCallbacks, Conditions } from '@utils/commons'
import { QuestionFromModel } from '@modules/questions/data/models/questions'
import { UpdateTagsCount } from '@modules/questions'
import { addUserCoins } from '@utils/modules/users/transactions'
import { GetUsers } from '@modules/users'
import { sendNotification } from '@utils/modules/users/notifications'
import { getSocketEmitter } from '@index'
import { QuestionMapper } from '@modules/questions/data/mappers'

export const QuestionChangeStreamCallbacks: ChangeStreamCallbacks<QuestionFromModel> = {
	created: async (questionModel) => {
		const question = new QuestionMapper().mapFrom(questionModel)!

		// Broadcast new question for those connected to the channel
		await getSocketEmitter().emitCreated('questions', question)

		// Reduce user coins
		await addUserCoins(question.userId, {
			bronze: 0 - question.coins,
			gold: 0
		}, 'You paid coins to ask a question!')

		// increment tags count
		await UpdateTagsCount.execute({
			tagIds: question.tags,
			increment: true
		})

		// TODO: Increase user question's count

		// Send notification to all tutors with strongest subject
		const tutors = await GetUsers.execute({
			where: [
				{ field: 'tutor.strongestSubject', value: question.subjectId, condition: Conditions.eq }
			]
		})
		tutors.results.map((t) => t.id).map((id) => {
			sendNotification(id, {
				body: 'A new question was just asked on Stranerd that you might be interested in. Go check it out',
				action: `/questions/${ question.id }`
			}, 'New Question')
		})
	}
}