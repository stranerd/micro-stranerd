import { ChangeStreamCallbacks } from '@utils/commons'
import { BadgesUseCases, ReviewsUseCases, UserEntity, UserFromModel } from '@modules/users'
import { AnswerCommentsUseCases, AnswersUseCases, QuestionsUseCases } from '@modules/questions'
import { UpdateChatMetasUserBio, UpdateSessionsUserBio } from '@modules/sessions'
import {
	AddSet,
	SetType,
	UpdateCommentsUserBio,
	UpdateFlashCardsUserBio,
	UpdateNotesUserBio,
	UpdateSetsUserBio,
	UpdateVideosUserBio
} from '@modules/study'
import { ReportsUseCases } from '@modules/reports'
import {
	GroupsUseCases,
	UpdateAnnouncementsUserBio,
	UpdateClassesUserBio,
	UpdateDiscussionsUserBio
} from '@modules/classes'
import { sendNotification } from '@utils/modules/users/notifications'
import { getSocketEmitter } from '@index'

export const UserChangeStreamCallbacks: ChangeStreamCallbacks<UserFromModel, UserEntity> = {
	created: async ({ after }) => {
		await getSocketEmitter().emitCreated('users/users', after)
		await getSocketEmitter().emitCreated(`users/users/${after.id}`, after)

		await AddSet.execute({
			name: '', data: { type: SetType.users },
			userId: after.id,
			userBio: after.bio,
			userRoles: after.roles
		})
	},
	updated: async ({ before, after, changes }) => {
		await getSocketEmitter().emitUpdated('users/users', after)
		await getSocketEmitter().emitUpdated(`users/users/${after.id}`, after)
		const updatedBioOrRoles = !!changes.bio || !!changes.roles
		if (updatedBioOrRoles) await Promise.all([
			QuestionsUseCases.updateUserBio, AnswersUseCases.updateUserBio, AnswerCommentsUseCases.updateUserBio,
			UpdateChatMetasUserBio.execute, UpdateSessionsUserBio.execute, ReportsUseCases.updateUserBio, ReviewsUseCases.updateUserBio,
			UpdateVideosUserBio.execute, UpdateCommentsUserBio.execute, UpdateNotesUserBio.execute, UpdateFlashCardsUserBio.execute, UpdateSetsUserBio.execute,
			UpdateClassesUserBio.execute, UpdateAnnouncementsUserBio.execute, GroupsUseCases.updateUserBio, UpdateDiscussionsUserBio.execute
		].map(async (useCase) => await useCase({
			userId: after.id,
			userBio: after.bio,
			userRoles: after.roles
		})))

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
				await BadgesUseCases.recordRank({
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
				await BadgesUseCases.recordRank({
					userId: after.id,
					rank: before.rank.id,
					add: false
				})
				await BadgesUseCases.recordRank({
					userId: after.id,
					rank: after.rank.id,
					add: true
				})
			}
		}
	},
	deleted: async ({ before }) => {
		await getSocketEmitter().emitDeleted('users/users', before)
		await getSocketEmitter().emitDeleted(`users/users/${before.id}`, before)
	}
}