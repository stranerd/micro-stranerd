import {
	AnnouncementsUseCases,
	ClassesUseCases,
	EventsUseCases,
	GroupsUseCases,
	SchemesUseCases
} from '@modules/classes'
import { CommentsUseCases, LikesUseCases, ViewsUseCases } from '@modules/interactions'
import { ChatMetasUseCases, ChatsUseCases } from '@modules/messaging'
import { ReportsUseCases } from '@modules/moderation'
import { AnswersUseCases, QuestionsUseCases } from '@modules/questions'
import { FilesUseCases, FlashCardsUseCases, NotesUseCases, SetsUseCases } from '@modules/study'
import {
	AssignmentSubmissionsUseCases,
	AssignmentsUseCases,
	AttendancesUseCases,
	CoursesUseCases,
	FilesUseCases as CoursesFilesUseCases,
	PostsUseCases
} from '@modules/teachers'
import { BadgesUseCases, ConnectsUseCases, UserEntity, UserFromModel } from '@modules/users'
import { ChangeStreamCallbacks } from '@utils/app/package'
import { appInstance } from '@utils/app/types'

export const UserChangeStreamCallbacks: ChangeStreamCallbacks<UserFromModel, UserEntity> = {
	created: async ({ after }) => {
		await appInstance.socketEmitter.emitCreated('users/users', after)
		await appInstance.socketEmitter.emitCreated(`users/users/${after.id}`, after)

		await SetsUseCases.add({ name: '', user: after.getEmbedded() })
	},
	updated: async ({ before, after, changes }) => {
		await appInstance.socketEmitter.emitUpdated('users/users', after)
		await appInstance.socketEmitter.emitUpdated(`users/users/${after.id}`, after)
		const updatedBioOrRoles = !!changes.bio || !!changes.roles
		if (updatedBioOrRoles) await Promise.all([
			ChatMetasUseCases, ChatsUseCases, ConnectsUseCases,
			QuestionsUseCases, AnswersUseCases, CommentsUseCases, LikesUseCases, ViewsUseCases,
			ClassesUseCases, AnnouncementsUseCases, GroupsUseCases, EventsUseCases, SchemesUseCases,
			CoursesUseCases, CoursesFilesUseCases, AttendancesUseCases, AssignmentsUseCases, AssignmentSubmissionsUseCases, PostsUseCases,
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
		await appInstance.socketEmitter.emitDeleted('users/users', before)
		await appInstance.socketEmitter.emitDeleted(`users/users/${before.id}`, before)
	}
}