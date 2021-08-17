import { CustomError } from '../customError'
import { StatusCodes } from '../../express'

export class AccessTokenExpired extends CustomError {
	statusCode = StatusCodes.AccessTokenExpired

	constructor() {
		super('Access token expired')
	}

	serializeErrors() {
		return [{ message: 'Access token expired' }]
	}
}
