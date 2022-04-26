import { createTransport } from 'nodemailer'
import path from 'path'
import { emails, isDev } from '@utils/environment'
import { appInstance, EmailsList, TypedEmail } from '@utils/commons'
import { EmailErrorsUseCases } from '@modules/emails'

export const sendMail = async (email: TypedEmail) => {
	const { to, subject, content, from = EmailsList.NO_REPLY } = email
	const { clientId, privateKey } = emails[from]

	const transporter = createTransport({
		service: 'gmail',
		auth: { type: 'OAuth2', user: from, serviceClient: clientId, privateKey },
		tls: { rejectUnauthorized: false }
	})
	await transporter.verify()

	const attachments = [] as { filename: string, path: string, cid: string }[]

	if (email.data.attachments?.logoWhite) attachments.push({
		filename: 'logo-white.png',
		path: path.join('emails/attachments/logo-white.png'),
		cid: 'logo-white'
	})
	if (email.data.attachments?.logoBlue) attachments.push({
		filename: 'logo-blue.png',
		path: path.join('emails/attachments/logo-blue.png'),
		cid: 'logo-blue'
	})
	if (email.data.attachments?.icon) attachments.push({
		filename: 'icon.png',
		path: path.join('emails/attachments/icon.png'),
		cid: 'icon'
	})

	await transporter.sendMail({
		from: `Stranerd ${from}`,
		html: content,
		to, subject, attachments
	})
}

export const sendMailAndCatchError = async (email: TypedEmail) => {
	try {
		if (isDev) await appInstance.logger.info(email.to, email.content)
		await sendMail(email)
	} catch (e) {
		await EmailErrorsUseCases.add({
			...email,
			error: (e as Error).message
		})
	}
}