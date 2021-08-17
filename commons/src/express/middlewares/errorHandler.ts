import { makeErrorMiddleware } from '../controllers'
import { CustomError } from '../../errors'

export const errorHandler = makeErrorMiddleware(
	async (_, err) => {
		const error = err as CustomError
		if (error.isCustomError) {
			return {
				status: error.statusCode,
				result: {
					errors: error.serializeErrors()
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
