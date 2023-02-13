import { ChangeStreamCallbacks, EmailsList, readEmailFromPug } from '@utils/app/package'
import { NotificationEntity, NotificationFromModel, UsersUseCases } from '@modules/users'
import { sendPushNotification } from '@utils/modules/push'
import { clientDomain } from '@utils/environment'
import { publishers } from '@utils/events'
import { appInstance } from '@utils/app/types'

export const NotificationChangeStreamCallbacks: ChangeStreamCallbacks<NotificationFromModel, NotificationEntity> = {
	created: async ({ after }) => {
		await appInstance.socketEmitter.emitCreated(`users/notifications/${after.userId}`, after)
		await appInstance.socketEmitter.emitCreated(`users/notifications/${after.id}/${after.userId}`, after)

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
				await publishers.SENDMAIL.publish({
					from: EmailsList.NO_REPLY, to: user.bio.email, subject: after.title,
					content, data: {}
				})
			}
		}
	},
	updated: async ({ after }) => {
		await appInstance.socketEmitter.emitUpdated(`users/notifications/${after.userId}`, after)
		await appInstance.socketEmitter.emitUpdated(`users/notifications/${after.id}/${after.userId}`, after)
	},
	deleted: async ({ before }) => {
		await appInstance.socketEmitter.emitDeleted(`users/notifications/${before.userId}`, before)
		await appInstance.socketEmitter.emitDeleted(`users/notifications/${before.id}/${before.userId}`, before)
	}
}