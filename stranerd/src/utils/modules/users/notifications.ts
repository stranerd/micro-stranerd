import { NotificationToModel } from '@modules/users/data/models/notifications'
import { CreateNotification, FindUser } from '@modules/users'
import { publishers } from '@utils/events'
import { Emails, EventTypes, readEmailFromPug } from '@utils/commons'
import { clientDomain, logo } from '@utils/environment'

export const sendNotification = async (userId: string, data: Omit<NotificationToModel, 'userId'>, title?: string) => {
	if (title) {
		const user = await FindUser.execute(userId)
		if (user) {
			const content = await readEmailFromPug('emails/newNotification.pug', {
				notification: { ...data, title },
				meta: { logo, clientDomain }
			})
			await publishers[EventTypes.SENDMAIL].publish({
				from: Emails.NO_REPLY,
				to: user.bio.email,
				subject: title,
				content
			})
		}
	} else await CreateNotification.execute({ ...data, userId })
}