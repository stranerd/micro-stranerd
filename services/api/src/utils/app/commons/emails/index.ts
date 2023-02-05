import { IEmailsList } from '../enums/types'
import pug from 'pug'
import path from 'path'

export type Email = {
	to: string
	subject: string
	content: string
	from: IEmailsList[keyof IEmailsList]
	data: {}
}

export const readEmailFromPug = async (filePath: string, data: Record<string, any>) => {
	// filePath needs to be relative to the root of the running process
	const file = path.join('./', filePath)
	return pug.renderFile(file, data)
}