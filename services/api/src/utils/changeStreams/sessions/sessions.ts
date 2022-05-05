import { ChangeStreamCallbacks } from '@utils/commons'
import { ChatsUseCases, SessionEntity, SessionFromModel, SessionsUseCases } from '@modules/sessions'
import { sendNotification } from '@utils/modules/users/notifications'
import { BadgesUseCases, CountStreakBadges, ScoreRewards, UsersUseCases } from '@modules/users'
import { cancelSessionTask, scheduleSession, startSession } from '@utils/modules/sessions/sessions'
import { getSocketEmitter } from '@index'

export const SessionChangeStreamCallbacks: ChangeStreamCallbacks<SessionFromModel, SessionEntity> = {
	created: async ({ after }) => {
		await getSocketEmitter().emitCreated(`sessions/sessions/${after.student.id}`, after)
		await getSocketEmitter().emitCreated(`sessions/sessions/${after.tutor.id}`, after)
		await getSocketEmitter().emitCreated(`sessions/sessions/${after.id}/${after.student.id}`, after)
		await getSocketEmitter().emitCreated(`sessions/sessions/${after.id}/${after.tutor.id}`, after)

		await UsersUseCases.updateQueuedSessions({
			studentId: after.student.id,
			tutorId: after.tutor.id,
			sessionIds: [after.id],
			add: true
		})

		await ChatsUseCases.add({
			from: after.student.id, to: after.tutor.id,
			sessionId: after.id,
			content: after.message,
			media: null
		})

		await sendNotification(after.tutor.id, {
			title: 'New Session Request',
			body: `${after.student.bio.firstName ?? 'Anon'} is requesting a new ${after.duration} minutes session with you!`,
			action: 'sessions',
			data: { userId: after.student.id, sessionId: after.id }
		}, true)
	},
	updated: async ({ before, after, changes }) => {
		await getSocketEmitter().emitUpdated(`sessions/sessions/${after.student.id}`, after)
		await getSocketEmitter().emitUpdated(`sessions/sessions/${after.tutor.id}`, after)
		await getSocketEmitter().emitUpdated(`sessions/sessions/${after.id}/${after.student.id}`, after)
		await getSocketEmitter().emitUpdated(`sessions/sessions/${after.id}/${after.tutor.id}`, after)

		// Tutor just accepted or rejected the session
		if (before.accepted === null && changes.accepted) {
			if (after.accepted) {
				const tutor = await UsersUseCases.find(after.tutor.id)
				const tutorLobby = tutor?.session.lobby ?? []
				const filteredLobbiedSessionIds = tutorLobby.filter((s) => s !== after.id)

				// Delete current session key and other lobbied sessions from both users
				await UsersUseCases.updateQueuedSessions({
					studentId: after.student.id,
					tutorId: after.tutor.id,
					sessionIds: tutorLobby,
					add: false
				})

				// Send accepted message
				await ChatsUseCases.add({
					from: after.tutor.id, to: after.student.id,
					sessionId: after.id,
					content: 'Session accepted',
					media: null
				})

				if (after.isScheduled) await scheduleSession(after)
				else {
					await startSession(after)

					// Cancel All Other Lobbied Sessions
					await SessionsUseCases.cancel({
						sessionIds: filteredLobbiedSessionIds,
						userId: after.tutor.id,
						reason: 'tutor'
					})
				}
			} else {
				await UsersUseCases.updateQueuedSessions({
					studentId: after.student.id,
					tutorId: after.tutor.id,
					sessionIds: [after.id],
					add: false
				})

				await ChatsUseCases.add({
					from: after.tutor.id, to: after.student.id,
					sessionId: after.id,
					content: 'Session rejected',
					media: null
				})
			}
		}
		// Session was just concluded or cancelled, so cleanup
		if (!before.done && after.done) {
			if (after.accepted) await UsersUseCases.setCurrentSession({
				studentId: after.student.id,
				tutorId: after.tutor.id,
				sessionId: after.id,
				add: false
			})
			if (!after.wasCancelled) {
				await UsersUseCases.updateNerdScore({
					userId: after.student.id,
					amount: ScoreRewards.CompleteSession
				})
				await UsersUseCases.incrementSessionCount({
					tutorId: after.tutor.id,
					studentId: after.student.id,
					value: 1
				})
			} else await cancelSessionTask(after)
		}

		// Session was cancelled by the system cos the tutor accepted another session
		if (!after.accepted && !before.cancelled.student && after.cancelled.tutor) {
			await UsersUseCases.updateQueuedSessions({
				studentId: after.student.id,
				tutorId: after.tutor.id,
				sessionIds: [after.id],
				add: false
			})
			await ChatsUseCases.add({
				from: after.tutor.id, to: after.student.id,
				sessionId: after.id,
				content: 'Session rejected',
				media: null
			})
			await BadgesUseCases.recordCountStreak({
				userId: after.student.id,
				activity: CountStreakBadges.AttendSession,
				add: true
			})
			await BadgesUseCases.recordCountStreak({
				userId: after.tutor.id,
				activity: CountStreakBadges.HostSession,
				add: true
			})
		}
	},
	deleted: async ({ before }) => {
		await getSocketEmitter().emitDeleted(`sessions/sessions/${before.student.id}`, before)
		await getSocketEmitter().emitDeleted(`sessions/sessions/${before.tutor.id}`, before)
		await getSocketEmitter().emitDeleted(`sessions/sessions/${before.id}/${before.student.id}`, before)
		await getSocketEmitter().emitDeleted(`sessions/sessions/${before.id}/${before.tutor.id}`, before)
		await ChatsUseCases.deleteSessionChats(before.id)
		if (before.done) {
			await UsersUseCases.incrementSessionCount({
				tutorId: before.tutor.id,
				studentId: before.student.id,
				value: -1
			})
			await cancelSessionTask(before)
		}
	}
}