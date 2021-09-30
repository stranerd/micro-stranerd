import pug from 'pug'
import path from 'path'

export enum Emails {
	NO_REPLY = 'no-reply@stranerd.com'
}

export type Email = {
	to: string
	subject: string
	content: string
	from: Emails
	attachments: {
		logoWhite?: boolean
		logoBlue?: boolean
		icon?: boolean
	}
}

export const readEmailFromPug = async (filePath: string, data: Record<string, any>) => {
	// filePath needs to be relative to the root of the microservice running the process
	const file = path.join('./', filePath)
	return pug.renderFile(file, data)
}