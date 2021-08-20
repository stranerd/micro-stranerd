import { makeMiddleware } from '../controllers'
import { EmailNotVerifiedError, NotAuthenticatedError } from '../../errors'
import { verifyAccessToken } from '../../utils/tokens'

export const requireAuthUser = makeMiddleware(
	async (request) => {
		const accessToken = request.headers.AccessToken
		if (!accessToken) throw new NotAuthenticatedError()
		request.authUser = await verifyAccessToken(accessToken)
		if (!request.authUser) throw new NotAuthenticatedError()
		if (!request.authUser.isVerified) throw new EmailNotVerifiedError()
	}
)
