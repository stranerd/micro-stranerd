import { ChangeStreamCallbacks, EmailsList, EventTypes, readEmailFromPug } from '@utils/commons'
import { NotificationEntity, NotificationFromModel, UsersUseCases } from '@modules/users'
import { getSocketEmitter } from '@index'
import { sendPushNotification } from '@utils/modules/push'
import { clientDomain } from '@utils/environment'
import { publishers } from '@utils/events'

export const NotificationChangeStreamCallbacks: ChangeStreamCallbacks<NotificationFromModel, NotificationEntity> = {
	created: async ({ after }) => {
		await getSocketEmitter().emitCreated(`users/notifications/${after.userId}`, after)
		await getSocketEmitter().emitCreated(`users/notifications/${after.id}/${after.userId}`, after)

		await sendPushNotification({
			userIds: [after.userId],
			title: after.title, body: after.body,
			data: {
				type: 'notifications',
				data: { id: after.id, data: after.data }
			}
		})

		if (after.sendEmail) {
			const user = await UsersUseCases.find(after.userId)
			if (user) {
				const content = await readEmailFromPug('emails/newNotification.pug', {
					notification: after, meta: { link: clientDomain }
				})
				await publishers[EventTypes.SENDMAIL].publish({
					from: EmailsList.NO_REPLY, to: user.bio.email, subject: after.title,
					content, data: {}
				})
			}
		}
	},
	updated: async ({ after }) => {
		await getSocketEmitter().emitUpdated(`users/notifications/${after.userId}`, after)
		await getSocketEmitter().emitUpdated(`users/notifications/${after.id}/${after.userId}`, after)
	},
	deleted: async ({ before }) => {
		await getSocketEmitter().emitDeleted(`users/notifications/${before.userId}`, before)
		await getSocketEmitter().emitDeleted(`users/notifications/${before.id}/${before.userId}`, before)
	}
}