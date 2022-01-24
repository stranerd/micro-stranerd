import { makeMiddleware } from '../controllers'
import { NotAuthenticatedError } from '../../errors'

export const requireAuthUser = makeMiddleware(
	async (request) => {
		if (!request.authUser) throw new NotAuthenticatedError()
		// if (!request.authUser.isVerified) throw new EmailNotVerifiedError()
	}
)
