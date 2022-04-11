import { makeErrorMiddleware } from '../controllers'
import { CustomError } from '../../errors'
import { StatusCodes } from '../statusCodes'
import { Instance } from '../../instance'

export const errorHandler = makeErrorMiddleware(
	async (_, err) => {
		const error = err as CustomError
		if (error.isCustomError) {
			return {
				status: error.statusCode,
				result: error.serializedErrors
			}
		} else {
			await Instance.getInstance().logger.error(err)
			return {
				status: StatusCodes.BadRequest,
				result: [{ message: 'Something went wrong', data: err }]
			}
		}
	}
)
