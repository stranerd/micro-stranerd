import pug from 'pug'
import path from 'path'

export type Email<EmailEnum, Data = {}> = {
	to: string
	subject: string
	content: string
	from: EmailEnum
	data: Data
}

export const readEmailFromPug = async (filePath: string, data: Record<string, any>) => {
	// filePath needs to be relative to the root of the microservice running the process
	const file = path.join('./', filePath)
	return pug.renderFile(file, data)
}