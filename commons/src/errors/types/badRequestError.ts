import { CustomError } from '../customError'
import { StatusCodes } from '../../express'

export class BadRequestError extends CustomError {
	statusCode = StatusCodes.BadRequest
	serializedErrors

	constructor (message: string) {
		super(message)
		this.serializedErrors = [{ message }]
	}
}
