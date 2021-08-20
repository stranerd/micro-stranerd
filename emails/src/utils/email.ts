import { createTransport } from 'nodemailer'
import { emails } from '@utils/environment'
import { Email, Emails } from '@utils/commons'

export const sendMail = async (email: Email) => {
	const { to, subject, content, from = Emails.NO_REPLY } = email
	const { clientId, privateKey } = emails[from]

	const transporter = createTransport({
		service: 'gmail',
		auth: { type: 'OAuth2', user: from, serviceClient: clientId, privateKey },
		tls: { rejectUnauthorized: false }
	})
	await transporter.verify()
	await transporter.sendMail({
		from: 'Stranerd',
		to, subject,
		html: content
	})
}

export const sendMailAndCatchError = async (email: Email) => {
	try {
		await sendMail(email)
	} catch (e) {
		//
	}
}