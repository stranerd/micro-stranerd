import { makeMiddleware } from '../controllers'
import { NotAuthorizedError } from '../../errors'

export const requireAuth = makeMiddleware(
	async (request) => {
		if (!request.user) throw new NotAuthorizedError()
	}
)
