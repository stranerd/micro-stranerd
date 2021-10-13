import { makeMiddleware } from '../controllers'
import { NotAuthorizedError } from '../../errors'
import { verifyRefreshToken } from '../../utils/tokens'

export const requireRefreshUser = makeMiddleware(
	async (request) => {
		const refreshToken = request.headers.RefreshToken
		if (!refreshToken) throw new NotAuthorizedError()
		request.refreshUser = await verifyRefreshToken(refreshToken)
		if (!request.refreshUser) throw new NotAuthorizedError()
	}
)
