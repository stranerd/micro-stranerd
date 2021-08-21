import { CustomError } from '../customError'
import { StatusCodes } from '../../express'

const message = 'Refresh token misused'

export class RefreshTokenMisusedError extends CustomError {
	statusCode = StatusCodes.RefreshTokenMisused
	serializedErrors  = [{ message }]

	constructor () {
		super(message)
	}
}
