import { makeMiddleware } from '../controllers'
import { NotAuthenticatedError } from '../../errors'

export const requireAuthUser = makeMiddleware(
	async (request) => {
		if (request.pendingError) throw request.pendingError
		if (!request.authUser) throw new NotAuthenticatedError()
	}
)
