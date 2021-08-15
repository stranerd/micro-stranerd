import { CustomError } from '../customError'

type ValidationError = {
	message: string
	field: string
}

export class RequestValidationError extends CustomError {
	statusCode = 400
	errors: ValidationError[]

	constructor(errors: ValidationError[]) {
		super('Invalid request parameters')
		this.errors = errors
	}

	serializeErrors() {
		return this.errors
	}
}
