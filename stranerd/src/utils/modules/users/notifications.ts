import { NotificationToModel } from '@modules/users/data/models/notifications'
import { CreateNotification, FindUser } from '@modules/users'
import { publishers } from '@utils/events'
import { Emails, EventTypes, readEmailFromPug } from '@utils/commons'
import { clientDomain } from '@utils/environment'

export const sendNotification = async (userId: string, data: Omit<NotificationToModel, 'userId'>, title?: string) => {
	if (title) {
		const user = await FindUser.execute(userId)
		if (user) {
			const content = await readEmailFromPug('emails/newNotification.pug', {
				notification: { ...data, link: getNotificationLink(data.action, data.data), title },
				meta: { clientDomain }
			})
			await publishers[EventTypes.SENDMAIL].publish({
				from: Emails.NO_REPLY,
				to: user.bio.email,
				subject: title,
				content,
				attachments: { logoWhite: true }
			})
		}
	} else await CreateNotification.execute({ ...data, userId })
}

const getNotificationLink = (action: string, data: Record<string, any>): string => {
	if (action === 'questions') return `/questions/${ data.questionId }`
	else if (action === 'answers') return `/questions/${ data.questionId }#${ data.answerId }`
	else if (action === 'sessions') return `/sessions/${ data.studentId }`
	else if (action === 'users') return `/users/${ data.userId }`
	return '/dashboard'
}