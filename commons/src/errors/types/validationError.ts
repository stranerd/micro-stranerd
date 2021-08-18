import { CustomError } from '../customError'
import { StatusCodes } from '../../express'

type Error = {
	message: string
	field: string
}

export class ValidationError extends CustomError {
	statusCode = StatusCodes.ValidationError
	errors: Error[]

	constructor(errors: Error[]) {
		super('Invalid request parameters')
		this.errors = errors
	}

	serializeErrors() {
		return this.errors
	}
}
