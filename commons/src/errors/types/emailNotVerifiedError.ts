import { CustomError } from '../customError'
import { StatusCodes } from '../../express'

const message = 'Email address not verified'

export class EmailNotVerifiedError extends CustomError {
	statusCode = StatusCodes.EmailNotVerified

	constructor () {
		super(message)
	}

	get serializeErrors () {
		return [{ message }]
	}
}
