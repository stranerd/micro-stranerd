import { CustomError } from '../customError'
import { StatusCodes } from '../../express'

const message = 'Error connecting to database'

export class DatabaseConnectionError extends CustomError {
	statusCode = StatusCodes.DatabaseConnectionError

	constructor() {
		super(message)
	}

	serializeErrors() {
		return [{ message }]
	}
}
