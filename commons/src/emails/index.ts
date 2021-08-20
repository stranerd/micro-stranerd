import pug from 'pug'

export enum Emails {
	NO_REPLY = 'no-reply@stranerd.com'
}

export type Email = {
	to: string
	subject: string
	content: string
	from: Emails
}

export const readEmailFromPug = async (filePath: string, data: Record<string, any>) => pug.renderFile(filePath, data)