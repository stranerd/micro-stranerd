import { makeMiddleware } from '../controllers'
import { verifyAccessToken } from '../../utils/tokens'

export const parseAuthUser = makeMiddleware(
	async (request) => {
		const accessToken = request.headers.AccessToken
		if (accessToken) request.authUser = await verifyAccessToken(accessToken).catch(() => null)
	}
)
