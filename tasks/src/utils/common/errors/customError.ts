import { SupportedStatusCodes } from '../express'

export abstract class CustomError extends Error {
	abstract readonly statusCode: SupportedStatusCodes
	abstract readonly serializedErrors: { message: string; field?: string }[]
	isCustomError = true

	protected constructor (message: string) {
		super(message)
	}
}
