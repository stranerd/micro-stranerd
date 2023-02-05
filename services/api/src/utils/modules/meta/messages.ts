import { EmailsList, readEmailFromPug } from '@utils/app/package'
import { publishers } from '@utils/events'

export enum MessageType {
	student = 'student',
	school = 'school'
}

type Message = {
	firstName: string
	lastName: string
	email: string
	phone: string
	message: string
	country: string
	data: StudentData | SchoolData
}

type StudentData = {
	type: MessageType.student
}

type SchoolData = {
	type: MessageType.school
	school: string
	position: string
}

const makeEmailBody = (message: Message) => {
	let body = `<h2>${message.firstName} ${message.lastName}</h2>
<h3>${message.email}(${message.phone})</h3>
<h4>${message.country}</h4>
`
	if (message.data.type === MessageType.school) body += `
<h4>${message.data.position}(${message.data.school})</h4>
`

	body += `<p style="margin-top=2rem">${message.message}</p>`
	return body
}

export const sendNewMessageEmail = async (message: Message) => {
	const content = await readEmailFromPug('emails/newFormMessage.pug', {
		message: makeEmailBody(message)
	})
	await publishers.SENDMAIL.publish({
		from: EmailsList.NO_REPLY,
		to: 'support@stranerd.com',
		subject: 'New Message',
		content, data: {}
	})
}