import { makeErrorMiddleware } from '../controllers'
import { CustomError } from '../../errors'

export const errorHandler = makeErrorMiddleware(
	async (_, err) => {
		if (err instanceof CustomError) {
			return {
				status: err.statusCode,
				result: {
					errors: err.serializeErrors()
				}
			}
		} else return {
			status: 400,
			result: {
				errors: [{ message: 'Something went wrong', data: err }],
			}
		}
	}
)
