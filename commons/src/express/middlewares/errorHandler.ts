import { makeErrorMiddleware } from '../controllers'
import { CustomError } from '../../errors'
import { StatusCodes } from '../statusCodes'
import { Logger } from '../../logger'

export const errorHandler = makeErrorMiddleware(
	async (_, err) => {
		const error = err as CustomError
		if (error.isCustomError) {
			return {
				status: error.statusCode,
				result: {
					errors: error.serializedErrors
				}
			}
		} else {
			await Logger.error(err)
			return {
				status: StatusCodes.BadRequest,
				result: {
					errors: [{ message: 'Something went wrong', data: err }]
				}
			}
		}
	}
)
