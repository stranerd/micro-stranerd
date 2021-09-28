import { CustomError } from '../customError'
import { StatusCodes } from '../../express'

type Error = {
	messages: string[]
	field: string
}

export class ValidationError extends CustomError {
	statusCode = StatusCodes.ValidationError
	serializedErrors: { message: string; field?: string }[]

	constructor (errors: Error[]) {
		super('Invalid request parameters')
		this.serializedErrors = errors.map((e) => ({ field: e.field, message: e.messages.join('\n') }))
	}
}
