import { CustomError } from '../customError'
import { StatusCodes } from '../../express'

const message = 'Error connecting to database'

export class DatabaseConnectionError extends CustomError {
	statusCode = StatusCodes.DatabaseConnectionError
	serializedErrors

	constructor () {
		super(message)
		this.serializedErrors = [{ message }]
	}
}
