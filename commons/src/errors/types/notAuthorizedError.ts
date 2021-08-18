import { CustomError } from '../customError'
import { StatusCodes } from '../../express'

const message = 'Not authorized'

export class NotAuthorizedError extends CustomError {
	statusCode = StatusCodes.NotAuthorized

	constructor() {
		super(message)
	}

	serializeErrors() {
		return [{ message }]
	}
}
