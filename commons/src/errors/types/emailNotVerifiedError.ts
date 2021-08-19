import { CustomError } from '../customError'
import { StatusCodes } from '../../express'

const message = 'Email address not verified'

export class EmailNotVerifiedError extends CustomError {
	statusCode = StatusCodes.EmailNotVerified
	serializedErrors

	constructor () {
		super(message)
		this.serializedErrors = [{ message }]
	}
}
