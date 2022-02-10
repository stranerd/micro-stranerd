import { ChangeStreamCallbacks } from '@utils/commons'
import { RecordRank, UpdateMyReviewsBio, UserEntity, UserFromModel } from '@modules/users'
import { UpdateAnswerCommentsUserBio, UpdateAnswersUserBio, UpdateQuestionsUserBio } from '@modules/questions'
import { UpdateChatMetaUserBios, UpdateMySessionsBio } from '@modules/sessions'
import {
	UpdateCommentsUserBio,
	UpdateFlashCardsUserBio,
	UpdateNotesUserBio,
	UpdateSetsUserBio,
	UpdateVideosUserBio
} from '@modules/study'
import { sendNotification } from '@utils/modules/users/notifications'
import { getSocketEmitter } from '@index'
import { createRootSet } from '@utils/modules/study/sets'

export const UserChangeStreamCallbacks: ChangeStreamCallbacks<UserFromModel, UserEntity> = {
	created: async ({ after }) => {
		await getSocketEmitter().emitOpenCreated('users', after)
		await getSocketEmitter().emitOpenCreated(`users/${after.id}`, after)

		await createRootSet(after)
	},
	updated: async ({ before, after, changes }) => {
		await getSocketEmitter().emitOpenUpdated('users', after)
		await getSocketEmitter().emitOpenUpdated(`users/${after.id}`, after)
		const updatedBio = !!changes.bio
		if (updatedBio) await Promise.all([
			UpdateQuestionsUserBio, UpdateAnswersUserBio, UpdateAnswerCommentsUserBio,
			UpdateChatMetaUserBios, UpdateMySessionsBio, UpdateMyReviewsBio,
			UpdateVideosUserBio, UpdateCommentsUserBio, UpdateNotesUserBio, UpdateFlashCardsUserBio, UpdateSetsUserBio
		].map(async (useCase) => await useCase.execute({ userId: after.id, userBio: after.bio })))

		const updatedScore = !!changes.account?.score
		if (updatedScore && after.rank.id !== before.rank.id) {
			const increased = after.account.score > before.account.score
			if (increased) {
				await sendNotification(after.id, {
					title: 'Ranking Up',
					body: `Congrats, you just got promoted to ${after.rank.id}`,
					action: 'account',
					data: { profile: true }
				})
				await RecordRank.execute({
					userId: after.id,
					rank: after.rank.id,
					add: true
				})
			} else {
				await sendNotification(after.id, {
					title: 'Ranking Down',
					body: `Oops, you just got demoted to ${after.rank.id}`,
					action: 'account',
					data: { profile: true }
				})
				await RecordRank.execute({
					userId: after.id,
					rank: before.rank.id,
					add: false
				})
				await RecordRank.execute({
					userId: after.id,
					rank: after.rank.id,
					add: true
				})
			}
		}
	},
	deleted: async ({ before }) => {
		await getSocketEmitter().emitOpenDeleted('users', before)
		await getSocketEmitter().emitOpenDeleted(`users/${before.id}`, before)
	}
}