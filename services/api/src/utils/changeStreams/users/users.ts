import { ChangeStreamCallbacks } from '@utils/commons'
import { BadgesUseCases, ReviewsUseCases, UserEntity, UserFromModel } from '@modules/users'
import { AnswerCommentsUseCases, AnswersUseCases, QuestionsUseCases } from '@modules/questions'
import { ChatMetasUseCases, SessionsUseCases } from '@modules/sessions'
import { FilesUseCases, FlashCardsUseCases, SetsUseCases } from '@modules/study'
import { ReportsUseCases } from '@modules/reports'
import {
	AnnouncementsUseCases,
	ClassesUseCases,
	DiscussionsUseCases,
	EventsUseCases,
	GroupsUseCases
} from '@modules/classes'
import { sendNotification } from '@utils/modules/users/notifications'
import { getSocketEmitter } from '@index'

export const UserChangeStreamCallbacks: ChangeStreamCallbacks<UserFromModel, UserEntity> = {
	created: async ({ after }) => {
		await getSocketEmitter().emitCreated('users/users', after)
		await getSocketEmitter().emitCreated(`users/users/${after.id}`, after)

		await SetsUseCases.add({ name: '', user: after.getEmbedded() })
	},
	updated: async ({ before, after, changes }) => {
		await getSocketEmitter().emitUpdated('users/users', after)
		await getSocketEmitter().emitUpdated(`users/users/${after.id}`, after)
		const updatedBioOrRoles = !!changes.bio || !!changes.roles
		if (updatedBioOrRoles) await Promise.all([
			ChatMetasUseCases, SessionsUseCases, ReviewsUseCases, ReportsUseCases,
			QuestionsUseCases, AnswersUseCases, AnswerCommentsUseCases,
			ClassesUseCases, AnnouncementsUseCases, GroupsUseCases, DiscussionsUseCases, EventsUseCases,
			FilesUseCases, FlashCardsUseCases, SetsUseCases
		].map(async (useCase) => await useCase.updateUserBio(after.getEmbedded())))

		const updatedScore = !!changes.account?.score
		if (updatedScore && after.rank.id !== before.rank.id) {
			const increased = after.account.score > before.account.score
			if (increased) {
				await sendNotification([after.id], {
					title: 'Ranking Up',
					body: `Congrats, you just got promoted to ${after.rank.id}`,
					action: 'account', sendEmail: false,
					data: { profile: true }
				})
				await BadgesUseCases.recordRank({
					userId: after.id,
					rank: after.rank.id,
					add: true
				})
			} else {
				await sendNotification([after.id], {
					title: 'Ranking Down',
					body: `Oops, you just got demoted to ${after.rank.id}`,
					action: 'account', sendEmail: false,
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