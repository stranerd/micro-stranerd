import { CustomError } from '../customError'
import { StatusCodes } from '../../express'

const message = 'Access token expired'

export class AccessTokenExpired extends CustomError {
	statusCode = StatusCodes.AccessTokenExpired
	serializedErrors = [{ message }]

	constructor () {
		super(message)
	}
}
