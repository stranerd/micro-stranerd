import { CustomError } from '../customError'
import { StatusCodes } from '../../express'

const message = 'Not authenticated'

export class NotAuthenticatedError extends CustomError {
	statusCode = StatusCodes.NotAuthenticated
	serializedErrors

	constructor () {
		super(message)
		this.serializedErrors = [{ message }]
	}
}
