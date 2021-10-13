import { CustomError } from '../customError'
import { StatusCodes } from '../../express'

const message = 'Token is either expired or invalid'

export class InvalidToken extends CustomError {
	statusCode = StatusCodes.AccessTokenExpired
	serializedErrors = [{ message }]

	constructor () {
		super(message)
	}
}
