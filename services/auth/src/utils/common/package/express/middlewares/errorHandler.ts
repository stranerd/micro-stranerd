import { makeErrorMiddleware } from '../controllers'
import { CustomError } from '../../errors'
import { StatusCodes } from '../statusCodes'
import { getLogger } from '../../logger'

export const errorHandler = makeErrorMiddleware(
	async (_, err) => {
		const error = err as CustomError
		if (error.isCustomError) {
			return {
				status: error.statusCode,
				result: error.serializedErrors
			}
		} else {
			await getLogger().error(err)
			return {
				status: StatusCodes.BadRequest,
				result: [{ message: 'Something went wrong', data: err }]
			}
		}
	}
)
