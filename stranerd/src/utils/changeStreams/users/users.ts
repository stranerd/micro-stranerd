import { ChangeStreamCallbacks, EventTypes } from '@utils/commons'
import { publishers } from '@utils/events'
import { UserFromModel } from '@modules/users/data/models/users'
import { UserEntity } from '@modules/users/domain/entities/users'
import { UpdateAnswerCommentsUserBio, UpdateAnswersUserBio, UpdateQuestionsUserBio } from '@modules/questions'

export const UserChangeStreamCallbacks: ChangeStreamCallbacks<UserFromModel, UserEntity> = {
	updated: async ({ after, changes }) => {
		const updatedBio = !!changes.bio
		if (updatedBio) {
			await publishers[EventTypes.STRANERDUSERBIOUPDATED].publish({
				id: after.id,
				data: after.bio,
				timestamp: Date.now()
			})
			await UpdateQuestionsUserBio.execute({ userId: after.id, userBio: after.bio })
			await UpdateAnswersUserBio.execute({ userId: after.id, userBio: after.bio })
			await UpdateAnswerCommentsUserBio.execute({ userId: after.id, userBio: after.bio })
		}
	}
}