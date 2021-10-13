import { CustomError } from '../customError'
import { StatusCodes } from '../../express'

const message = 'Not found'

export class NotFoundError extends CustomError {
	statusCode = StatusCodes.NotFound
	serializedErrors = [{ message }]

	constructor () {
		super(message)
	}
}
