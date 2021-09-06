import { ChangeStreamCallbacks, Conditions } from '@utils/commons'
import { SessionEntity } from '@modules/sessions/domain/entities/session'
import { SessionFromModel } from '@modules/sessions/data/models/session'
import { AddChat, CancelSession, GetSessions } from '@modules/sessions'
import { sendNotification } from '@utils/modules/users/notifications'
import { addUserCoins } from '@utils/modules/users/transactions'
import { AddUserQueuedSessions, FindUser, RemoveUserQueuedSessions, SetUsersCurrentSession } from '@modules/users'

export const SessionChangeStreamCallbacks: ChangeStreamCallbacks<SessionFromModel, SessionEntity> = {
	created: async ({ after }) => {
		await AddChat.execute({
			path: [after.studentId, after.tutorId],
			data: {
				sessionId: after.id,
				content: after.message,
				media: null
			}
		})

		await addUserCoins(after.studentId, { gold: 0 - after.price, bronze: 0 },
			'You paid coins for a session'
		)

		await sendNotification(after.tutorId, {
			body: `${ after.studentBio.firstName ?? 'Anon' } is requesting a new ${ after.duration } minutes session with you!`,
			action: 'sessions',
			data: { userId: after.studentId }
		}, 'New Session Request')

		await AddUserQueuedSessions.execute({
			studentId: after.studentId,
			tutorId: after.tutorId,
			sessionId: after.id
		})
	},
	updated: async ({ before, after, changes }) => {
		if (before.accepted === null && changes.accepted) {
			if (after.accepted) {
				// TODO: create task and update its taskName

				const tutor = await FindUser.execute(after.tutorId)
				const tutorLobby = tutor?.session.lobby ?? []
				const filteredLobbiedSessionIds = tutorLobby.filter((s) => s !== after.id)

				// Delete current session key and other lobbied sessions from both users
				await RemoveUserQueuedSessions.execute({
					studentId: after.studentId,
					tutorId: after.tutorId,
					sessionIds: tutorLobby
				})

				// Set both current session
				await SetUsersCurrentSession.execute({
					studentId: after.studentId,
					tutorId: after.tutorId,
					sessionId: after.id
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

				// Pay Tutor
				await addUserCoins(after.tutorId, { gold: after.price, bronze: 0 },
					'You got paid for a session'
				)

				// Cancel All Other Lobbied Sessions
				await CancelSession.execute({
					sessionIds: filteredLobbiedSessionIds,
					userId: after.tutorId,
					reason: 'tutor'
				})

				// Get All Other Lobbied Sessions and Refund the owners
				const filteredLobbiedSessions = [] as SessionEntity[]
				const filteredLobbiedSessionsQuery = await GetSessions.execute({
					where: [{ field: 'id', condition: Conditions.in, value: filteredLobbiedSessionIds }]
				})
				filteredLobbiedSessionsQuery.results.forEach((s) => filteredLobbiedSessions.push(s))
				if (filteredLobbiedSessionsQuery.docs.total > filteredLobbiedSessionsQuery.docs.count) {
					const pages = filteredLobbiedSessionsQuery.pages.last
					const res = [] as number[]
					for (let i = 2; i <= pages; i++) res.push(i)
					const paginatedRes = await Promise.all(res.map((i) => GetSessions.execute({
						where: [{ field: 'id', condition: Conditions.in, value: filteredLobbiedSessionIds }],
						page: i
					})))
					paginatedRes.forEach((p) => filteredLobbiedSessions.push(...p.results))
				}
				await Promise.all(filteredLobbiedSessions.map((s) => addUserCoins(
					s.studentId,
					{ gold: s.price, bronze: 0 },
					'You got refunded for a rejected session'
				)))
			} else {
				await RemoveUserQueuedSessions.execute({
					studentId: after.studentId,
					tutorId: after.tutorId,
					sessionIds: [after.id]
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
	}
}