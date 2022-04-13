import { CustomError } from '../customError'
import { StatusCodes } from '../../express'

const message = 'Account not verified'

export class AccountNotVerifiedError extends CustomError {
	statusCode = StatusCodes.AccountNotVerified
	serializedErrors = [{ message }]

	constructor () {
		super(message)
	}
}
