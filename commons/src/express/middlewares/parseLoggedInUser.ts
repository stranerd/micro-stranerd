import jwt from 'jsonwebtoken'
import { makeMiddleware } from '../controllers'

export const parseLoggedInUser = makeMiddleware(
	async (request) => {
		const accessToken = request.headers.AccessToken
		if (!accessToken) return
		request.user = jwt.verify(accessToken, process.env.JWT_KEY!) as typeof request['user']
	}
)
