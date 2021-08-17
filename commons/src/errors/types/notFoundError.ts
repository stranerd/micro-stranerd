import { CustomError } from '../customError'
import { StatusCodes } from '../../express'

export class NotFoundError extends CustomError {
	statusCode = StatusCodes.NotFound

	constructor() {
		super('Not found')
	}

	serializeErrors() {
		return [{ message: 'Not found' }]
	}
}
