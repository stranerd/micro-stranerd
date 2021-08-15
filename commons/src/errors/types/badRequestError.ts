import { CustomError } from '../customError'

export class BadRequestError extends CustomError {
	statusCode = 400;
	message: string

	constructor(message: string) {
		super(message)
		this.message = message
	}

	serializeErrors() {
		return [{ message: this.message }]
	}
}
