import { NotificationEntity, NotificationFromModel, UsersUseCases } from '@modules/users'
import { ChangeStreamCallbacks, EmailsList, readEmailFromPug } from '@utils/app/package'
import { appInstance } from '@utils/app/types'
import { clientDomain } from '@utils/environment'
import { publishers } from '@utils/events'
import { sendPushNotification } from '@utils/modules/push'

export const NotificationChangeStreamCallbacks: ChangeStreamCallbacks<NotificationFromModel, NotificationEntity> = {
	created: async ({ after }) => {
		await appInstance.listener.created(`users/notifications/${after.userId}`, after)
		await appInstance.listener.created(`users/notifications/${after.id}/${after.userId}`, after)

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
		await appInstance.listener.updated(`users/notifications/${after.userId}`, after)
		await appInstance.listener.updated(`users/notifications/${after.id}/${after.userId}`, after)
	},
	deleted: async ({ before }) => {
		await appInstance.listener.deleted(`users/notifications/${before.userId}`, before)
		await appInstance.listener.deleted(`users/notifications/${before.id}/${before.userId}`, before)
	}
}