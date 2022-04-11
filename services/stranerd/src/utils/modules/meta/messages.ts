import { EmailsList, EventTypes, readEmailFromPug } from '@utils/commons'
import { publishers } from '@utils/events'

type Message = {
	firstName: string
	lastName: string
	email: string
	message: string
}

export const sendNewMessageEmail = async (message: Message) => {
	const content = await readEmailFromPug('emails/newFormMessage.pug', {
		message
	})
	await publishers[EventTypes.SENDMAIL].publish({
		from: EmailsList.NO_REPLY,
		to: 'support@stranerd.com',
		subject: 'New Message',
		content,
		data: {
			attachments: { logoWhite: true }
		}
	})
}