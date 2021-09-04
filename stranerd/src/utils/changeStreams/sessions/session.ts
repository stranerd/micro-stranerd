import { ChangeStreamCallbacks } from '@utils/commons'
import { SessionEntity } from '@modules/sessions/domain/entities/session'
import { SessionFromModel } from '@modules/sessions/data/models/session'
import { AddChat } from '@modules/sessions'
import { sendNotification } from '@utils/modules/users/notifications'
import { addUserCoins } from '@utils/modules/users/transactions'

export const SessionChangeStreamCallbacks: ChangeStreamCallbacks<SessionFromModel, SessionEntity> = {
	created: async ({ after }) => {
		await AddChat.execute({
			path: [after.studentId, after.tutorId],
			data: {
				sessionId: after.id,
				from: after.studentId,
				content: after.message,
				media: null
			}
		})

		await addUserCoins(after.studentId, { gold: 0 - after.price, bronze: 0 },
			'You paid coins for a session'
		)

		await sendNotification(after.tutorId, {
			body: `${ after.studentBio.firstName ?? 'Anon' } is requesting a new ${ after.duration } minutes session with you!`,
			action: `/sessions/${ after.studentId }`
		}, 'New Session Request')
	}
}