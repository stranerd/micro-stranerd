import pug from 'pug'

export enum EMAILS {
	NO_REPLY = 'no-reply@stranerd.com'
}

export type Email = {
	to: string
	subject: string
	content: string
	from: EMAILS
}

export const readEmailFromPug = async (filePath: string, data: Record<string, any>) => pug.renderFile(filePath, data)