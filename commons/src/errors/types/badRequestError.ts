import { CustomError } from '../customError'
import { StatusCodes } from '../../express'

export class BadRequestError extends CustomError {
	statusCode = StatusCodes.BadRequest
	message: string

	constructor (message: string) {
		super(message)
		this.message = message
	}

	get serializeErrors () {
		return [{ message: this.message }]
	}
}
