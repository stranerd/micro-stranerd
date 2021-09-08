import { ChangeStreamCallbacks } from '@utils/commons'
import { UserFromModel } from '@modules/users/data/models/users'
import { UserEntity } from '@modules/users/domain/entities/users'
import { UpdateAnswerCommentsUserBio, UpdateAnswersUserBio, UpdateQuestionsUserBio } from '@modules/questions'
import { UpdateChatMetaUserBios, UpdateMySessionsBio } from '@modules/sessions'

export const UserChangeStreamCallbacks: ChangeStreamCallbacks<UserFromModel, UserEntity> = {
	updated: async ({ after, changes }) => {
		const updatedBio = !!changes.bio
		if (updatedBio) {
			await UpdateQuestionsUserBio.execute({ userId: after.id, userBio: after.bio })
			await UpdateAnswersUserBio.execute({ userId: after.id, userBio: after.bio })
			await UpdateAnswerCommentsUserBio.execute({ userId: after.id, userBio: after.bio })
			await UpdateChatMetaUserBios.execute({ userId: after.id, userBio: after.bio })
			await UpdateMySessionsBio.execute({ userId: after.id, userBio: after.bio })
		}
	}
}