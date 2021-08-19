import { CustomError } from '../customError'
import { StatusCodes } from '../../express'

const message = 'Not authorized'

export class NotAuthorizedError extends CustomError {
	statusCode = StatusCodes.NotAuthorized
	serializedErrors

	constructor () {
		super(message)
		this.serializedErrors = [{ message }]
	}
}
