import { CustomError } from '../customError'
import { StatusCodes } from '../../express'

const message = 'Access token expired'

export class AccessTokenExpired extends CustomError {
	statusCode = StatusCodes.AccessTokenExpired

	constructor () {
		super(message)
	}

	get serializeErrors () {
		return [{ message }]
	}
}
