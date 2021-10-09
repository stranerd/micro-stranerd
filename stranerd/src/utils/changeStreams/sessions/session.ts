import { ChangeStreamCallbacks } from '@utils/commons'
import { AddChat, CancelSession, SessionEntity, SessionFromModel } from '@modules/sessions'
import { sendNotification } from '@utils/modules/users/notifications'
import { addUserCoins } from '@utils/modules/users/transactions'
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
		await getSocketEmitter().emitMineCreated('sessions', after, after.studentId)
		await getSocketEmitter().emitMineCreated(`sessions/${after.id}`, after, after.studentId)
		await getSocketEmitter().emitMineCreated('sessions', after, after.tutorId)
		await getSocketEmitter().emitMineCreated(`sessions/${after.id}`, after, after.tutorId)

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
			body: `${after.studentBio.firstName ?? 'Anon'} is requesting a new ${after.duration} minutes session with you!`,
			action: 'sessions',
			data: { userId: after.studentId }
		}, 'New Session Request')

		await addUserCoins(after.studentId, { gold: 0 - after.price, bronze: 0 },
			'You paid coins for a session'
		)
	},
	updated: async ({ before, after, changes }) => {
		await getSocketEmitter().emitMineUpdated('sessions', after, after.studentId)
		await getSocketEmitter().emitMineUpdated(`sessions/${after.id}`, after, after.studentId)
		await getSocketEmitter().emitMineUpdated('sessions', after, after.tutorId)
		await getSocketEmitter().emitMineUpdated(`sessions/${after.id}`, after, after.tutorId)

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

				await addUserCoins(after.studentId, { gold: after.price, bronze: 0 },
					'You got refunded for a rejected session'
				)
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
				await addUserCoins(after.tutorId, { gold: after.price, bronze: 0 },
					'You got paid for a session'
				)
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
			await addUserCoins(
				after.studentId,
				{ gold: after.price, bronze: 0 },
				'You got refunded for a rejected session'
			)
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
		await getSocketEmitter().emitMineDeleted('sessions', before, before.studentId)
		await getSocketEmitter().emitMineDeleted(`sessions/${before.id}`, before, before.studentId)
		await getSocketEmitter().emitMineDeleted('sessions', before, before.tutorId)
		await getSocketEmitter().emitMineDeleted(`sessions/${before.id}`, before, before.tutorId)
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