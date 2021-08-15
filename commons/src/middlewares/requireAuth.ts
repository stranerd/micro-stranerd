import { NotAuthorizedError, makeMiddleware } from '../'

export const requireAuth = makeMiddleware(
	async (request) => {
		if (!request.user) throw new NotAuthorizedError()
	}
)
