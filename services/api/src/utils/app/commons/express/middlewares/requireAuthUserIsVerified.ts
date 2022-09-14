import { makeMiddleware } from '../controllers'
import { AccountNotVerifiedError, NotAuthenticatedError } from '../../errors'

export const requireAuthUserIsVerified = makeMiddleware(
	async (request) => {
		if (request.pendingError) throw request.pendingError
		if (!request.authUser) throw new NotAuthenticatedError()
		if (!request.authUser.isVerified) throw new AccountNotVerifiedError()
	}
)
