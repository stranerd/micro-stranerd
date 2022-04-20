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

export const SessionChangeStreamCallbacks: ChangeStreamCallbacks<SessionFromModel, SessionEntity> = {
	created: async ({ after }) => {
		await getSocketEmitter().emitCreated(`sessions/sessions/${after.studentId}`, after)
		await getSocketEmitter().emitCreated(`sessions/sessions/${after.tutorId}`, after)
		await getSocketEmitter().emitCreated(`sessions/sessions/${after.id}/${after.studentId}`, after)
		await getSocketEmitter().emitCreated(`sessions/sessions/${after.id}/${after.tutorId}`, after)

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
		await getSocketEmitter().emitUpdated(`sessions/sessions/${after.studentId}`, after)
		await getSocketEmitter().emitUpdated(`sessions/sessions/${after.tutorId}`, after)
		await getSocketEmitter().emitUpdated(`sessions/sessions/${after.id}/${after.studentId}`, after)
		await getSocketEmitter().emitUpdated(`sessions/sessions/${after.id}/${after.tutorId}`, after)

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
		await getSocketEmitter().emitDeleted(`sessions/sessions/${before.studentId}`, before)
		await getSocketEmitter().emitDeleted(`sessions/sessions/${before.tutorId}`, before)
		await getSocketEmitter().emitDeleted(`sessions/sessions/${before.id}/${before.studentId}`, before)
		await getSocketEmitter().emitDeleted(`sessions/sessions/${before.id}/${before.tutorId}`, before)
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