import { CustomError } from '../customError'
import { StatusCodes } from '../../express'

const reason = 'Error connecting to database'

export class DatabaseConnectionError extends CustomError {
	statusCode = StatusCodes.DatabaseConnectionError

	constructor() {
		super(reason)
	}

	serializeErrors() {
		return [{ message: reason }]
	}
}
