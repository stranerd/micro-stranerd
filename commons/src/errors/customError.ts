import { SupportedStatusCodes } from '../express'

export abstract class CustomError extends Error {
	abstract statusCode: SupportedStatusCodes
	isCustomError = true

	protected constructor (message: string) {
		super(message)
	}

	abstract serializeErrors(): { message: string; field?: string }[]
}
