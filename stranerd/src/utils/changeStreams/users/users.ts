import { ChangeStreamCallbacks } from '@utils/commons'
import { UserEntity, UserFromModel } from '@modules/users'
import { UpdateAnswerCommentsUserBio, UpdateAnswersUserBio, UpdateQuestionsUserBio } from '@modules/questions'
import { UpdateChatMetaUserBios, UpdateMySessionsBio } from '@modules/sessions'
import { sendNotification } from '@utils/modules/users/notifications'
import { addUserCoins } from '@utils/modules/users/transactions'

export const UserChangeStreamCallbacks: ChangeStreamCallbacks<UserFromModel, UserEntity> = {
	created: async ({ after }) => {
		await addUserCoins(after.id, { gold: 10, bronze: 100 }, 'Congrats for signing up to Stranerd')
	},
	updated: async ({ before, after, changes }) => {
		const updatedBio = !!changes.bio
		if (updatedBio) {
			await UpdateQuestionsUserBio.execute({ userId: after.id, userBio: after.bio })
			await UpdateAnswersUserBio.execute({ userId: after.id, userBio: after.bio })
			await UpdateAnswerCommentsUserBio.execute({ userId: after.id, userBio: after.bio })
			await UpdateChatMetaUserBios.execute({ userId: after.id, userBio: after.bio })
			await UpdateMySessionsBio.execute({ userId: after.id, userBio: after.bio })
		}

		const updatedScore = !!changes.account?.score
		if (updatedScore && after.rank.id !== before.rank.id) {
			const increased = after.account.score > before.account.score
			if (increased) await sendNotification(after.id, {
				body: `Congrats, you just got promoted to ${ after.rank.id }`,
				action: 'users',
				data: { userId: after.id }
			})
			else await sendNotification(after.id, {
				body: `Oops, you just got demoted to ${ after.rank.id }`,
				action: 'users',
				data: { userId: after.id }
			})
		}
	}
}