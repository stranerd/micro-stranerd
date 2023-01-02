import { createTransport } from 'nodemailer'
import path from 'path'
import { emails, isDev } from '@utils/environment'
import { appInstance, EmailsList, TypedEmail } from '@utils/app/types'
import { EmailErrorsUseCases } from '@modules/feedback'

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

	attachments.push({
		filename: 'logo.png',
		path: path.join('emails/attachments/logo.png'),
		cid: 'logo'
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