import { ChangeStreamCallbacks } from '@utils/commons'
import { AddChat, CancelSession, DeleteSessionChats, SessionEntity, SessionFromModel } from '@modules/sessions'
import { sendNotification } from '@utils/modules/users/notifications'
import {
	CountStreakBadges,
	FindUser,
	IncrementUsersSessionsCount,
	RecordCountStreak,
	ScoreRewards,
	SetUsersCurrentSession,
	UpdateUserNerdScore,
	UpdateUserQueuedSessions
} from '@modules/users'
import { cancelSessionTask, scheduleSession, startSession } from '@utils/modules/sessions/sessions'
import { getSocketEmitter } from '@index'

getSocketEmitter().register('sessions/sessions', getSocketEmitter().quickRegisters.isMine)
export const SessionChangeStreamCallbacks: ChangeStreamCallbacks<SessionFromModel, SessionEntity> = {
	created: async ({ after }) => {
		await getSocketEmitter().emitPathCreated('sessions/sessions', after, after.studentId)
		await getSocketEmitter().emitPathCreated('sessions/sessions', after, after.tutorId)
		await getSocketEmitter().emitPathCreated(`sessions/sessions/${after.id}`, after, after.studentId)
		await getSocketEmitter().emitPathCreated(`sessions/sessions/${after.id}`, after, after.tutorId)

		await UpdateUserQueuedSessions.execute({
			studentId: after.studentId,
			tutorId: after.tutorId,
			sessionIds: [after.id],
			add: true
		})

		await AddChat.execute({
			path: [after.studentId, after.tutorId],
			data: {
				sessionId: after.id,
				content: after.message,
				media: null
			}
		})

		await sendNotification(after.tutorId, {
			title: 'New Session Request',
			body: `${after.studentBio.firstName ?? 'Anon'} is requesting a new ${after.duration} minutes session with you!`,
			action: 'sessions',
			data: { userId: after.studentId, sessionId: after.id }
		}, true)
	},
	updated: async ({ before, after, changes }) => {
		await getSocketEmitter().emitPathUpdated('sessions/sessions', after, after.studentId)
		await getSocketEmitter().emitPathUpdated('sessions/sessions', after, after.tutorId)
		await getSocketEmitter().emitPathUpdated(`sessions/sessions/${after.id}`, after, after.studentId)
		await getSocketEmitter().emitPathUpdated(`sessions/sessions/${after.id}`, after, after.tutorId)

		// Tutor just accepted or rejected the session
		if (before.accepted === null && changes.accepted) {
			if (after.accepted) {
				const tutor = await FindUser.execute(after.tutorId)
				const tutorLobby = tutor?.session.lobby ?? []
				const filteredLobbiedSessionIds = tutorLobby.filter((s) => s !== after.id)

				// Delete current session key and other lobbied sessions from both users
				await UpdateUserQueuedSessions.execute({
					studentId: after.studentId,
					tutorId: after.tutorId,
					sessionIds: tutorLobby,
					add: false
				})

				// Send accepted message
				await AddChat.execute({
					path: [after.tutorId, after.studentId],
					data: {
						sessionId: after.id,
						content: 'Session accepted',
						media: null
					}
				})

				if (after.isScheduled) await scheduleSession(after)
				else {
					await startSession(after)

					// Cancel All Other Lobbied Sessions
					await CancelSession.execute({
						sessionIds: filteredLobbiedSessionIds,
						userId: after.tutorId,
						reason: 'tutor'
					})
				}
			} else {
				await UpdateUserQueuedSessions.execute({
					studentId: after.studentId,
					tutorId: after.tutorId,
					sessionIds: [after.id],
					add: false
				})

				await AddChat.execute({
					path: [after.tutorId, after.studentId],
					data: {
						sessionId: after.id,
						content: 'Session rejected',
						media: null
					}
				})
			}
		}
		// Session was just concluded or cancelled, so cleanup
		if (!before.done && after.done) {
			if (after.accepted) await SetUsersCurrentSession.execute({
				studentId: after.studentId,
				tutorId: after.tutorId,
				sessionId: after.id,
				add: false
			})
			if (!after.wasCancelled) {
				await UpdateUserNerdScore.execute({
					userId: after.studentId,
					amount: ScoreRewards.CompleteSession
				})
				await IncrementUsersSessionsCount.execute({
					tutorId: after.tutorId,
					studentId: after.studentId,
					value: 1
				})
			} else await cancelSessionTask(after)
		}

		// Session was cancelled by the system cos the tutor accepted another session
		if (!after.accepted && !before.cancelled.student && after.cancelled.tutor) {
			await UpdateUserQueuedSessions.execute({
				studentId: after.studentId,
				tutorId: after.tutorId,
				sessionIds: [after.id],
				add: false
			})
			await AddChat.execute({
				path: [after.tutorId, after.studentId],
				data: {
					sessionId: after.id,
					content: 'Session rejected',
					media: null
				}
			})
			await RecordCountStreak.execute({
				userId: after.studentId,
				activity: CountStreakBadges.AttendSession,
				add: true
			})
			await RecordCountStreak.execute({
				userId: after.tutorId,
				activity: CountStreakBadges.HostSession,
				add: true
			})
		}
	},
	deleted: async ({ before }) => {
		await getSocketEmitter().emitPathDeleted('sessions/sessions', before, before.studentId)
		await getSocketEmitter().emitPathDeleted(`sessions/sessions/${before.id}`, before, before.studentId)
		await getSocketEmitter().emitPathDeleted('sessions/sessions', before, before.tutorId)
		await getSocketEmitter().emitPathDeleted(`sessions/sessions/${before.id}`, before, before.tutorId)
		await DeleteSessionChats.execute(before.id)
		if (before.done) {
			await IncrementUsersSessionsCount.execute({
				tutorId: before.tutorId,
				studentId: before.studentId,
				value: -1
			})
			await cancelSessionTask(before)
		}
	}
}