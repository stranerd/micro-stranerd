import { CustomError } from '../customError'
import { StatusCodes } from '../../express'

const message = 'Not found'

export class NotFoundError extends CustomError {
	statusCode = StatusCodes.NotFound
	serializedErrors

	constructor () {
		super(message)
		this.serializedErrors = [{ message }]
	}
}
