import { CustomError } from '../customError'
import { StatusCodes } from '../../express'

export class NotAuthorizedError extends CustomError {
	statusCode = StatusCodes.NotAuthorized

	constructor() {
		super('Not authorized')
	}

	serializeErrors() {
		return [{ message: 'Not authorized' }]
	}
}
