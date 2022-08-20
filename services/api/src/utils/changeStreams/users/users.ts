import { ChangeStreamCallbacks } from '@utils/commons'
import { BadgesUseCases, ConnectsUseCases, ReviewsUseCases, UserEntity, UserFromModel } from '@modules/users'
import { AnswersUseCases, QuestionsUseCases } from '@modules/questions'
import { ChatMetasUseCases, ChatsUseCases, SessionsUseCases } from '@modules/messaging'
import { FilesUseCases, FlashCardsUseCases, NotesUseCases, SetsUseCases } from '@modules/study'
import { ReportsUseCases } from '@modules/reports'
import {
	AnnouncementsUseCases,
	ClassesUseCases,
	EventsUseCases,
	GroupsUseCases,
	SchemesUseCases
} from '@modules/classes'
import { getSocketEmitter } from '@index'
import { CommentsUseCases, LikesUseCases, ViewsUseCases } from '@modules/interactions'

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
			ChatMetasUseCases, ChatsUseCases, SessionsUseCases, ConnectsUseCases, ReviewsUseCases,
			QuestionsUseCases, AnswersUseCases, CommentsUseCases, LikesUseCases, ViewsUseCases,
			ClassesUseCases, AnnouncementsUseCases, GroupsUseCases, EventsUseCases, SchemesUseCases,
			NotesUseCases, FilesUseCases, FlashCardsUseCases, SetsUseCases, ReportsUseCases
		].map(async (useCase) => await useCase.updateUserBio(after.getEmbedded())))

		const updatedScore = !!changes.account?.score
		if (updatedScore && after.rank.id !== before.rank.id) {
			const increased = after.account.score > before.account.score
			if (increased) {
				await BadgesUseCases.recordRank({
					userId: after.id,
					rank: after.rank.id,
					add: true
				})
			} else {
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