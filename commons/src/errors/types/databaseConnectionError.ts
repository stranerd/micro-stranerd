import { CustomError } from '../customError'

export class DatabaseConnectionError extends CustomError {
	statusCode = 500;
	reason = 'Error connecting to database';

	constructor() {
		super('Error connecting to db')
	}

	serializeErrors() {
		return [{ message: this.reason }]
	}
}
