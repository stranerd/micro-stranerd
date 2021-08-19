import { SupportedStatusCodes } from '../express'

export abstract class CustomError extends Error {
	abstract statusCode: SupportedStatusCodes
	abstract serializeErrors: { message: string; field?: string }[]
	isCustomError = true

	protected constructor (message: string) {
		super(message)
	}
}
