import { createTransport } from 'nodemailer'
import { emails } from '@utils/environment'
import path from 'path'
import { Email, Emails } from '@utils/commons'
import { AddError } from '@modules/index'

export const sendMail = async (email: Email) => {
	const { to, subject, content, from = Emails.NO_REPLY } = email
	const { clientId, privateKey } = emails[from]

	const transporter = createTransport({
		service: 'gmail',
		auth: { type: 'OAuth2', user: from, serviceClient: clientId, privateKey },
		tls: { rejectUnauthorized: false }
	})
	await transporter.verify()

	const attachments = [] as { filename: string, path: string, cid: string }[]

	if (email.attachments.logoWhite) attachments.push({
		filename: 'logo-white.png',
		path: path.join('emails/attachments/logo-white.png'),
		cid: 'logo-white'
	})
	if (email.attachments.logoBlue) attachments.push({
		filename: 'logo-blue.png',
		path: path.join('emails/attachments/logo-blue.png'),
		cid: 'logo-blue'
	})
	if (email.attachments.icon) attachments.push({
		filename: 'icon.png',
		path: path.join('emails/attachments/icon.png'),
		cid: 'icon'
	})

	await transporter.sendMail({
		from: `Stranerd ${ from }`,
		html: content,
		to, subject, attachments
	})
}

export const sendMailAndCatchError = async (email: Email) => {
	try {
		await sendMail(email)
	} catch (e) {
		await AddError.execute({
			...email,
			error: e.message
		})
	}
}