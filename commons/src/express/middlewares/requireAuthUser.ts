import { makeMiddleware } from '../controllers'
import { NotAuthorizedError } from '../../errors'
import { verifyAccessToken } from '../../utils/tokens'

export const requireAuthUser = makeMiddleware(
	async (request) => {
		const accessToken = request.headers.AccessToken
		if (!accessToken) throw new NotAuthorizedError()
		request.authUser = await verifyAccessToken(accessToken)
		if (!request.authUser) throw new NotAuthorizedError()
	}
)
