import { makeController, Route, StatusCodes } from '@utils/commons'
import { AuthController } from '../controller/auth'

const token: Route = {
	path: '/token',
	method: 'post',
	controllers: [
		makeController(async (req) => {

			const accessToken = req.headers.AccessToken
			const refreshToken = req.headers.RefreshToken

			const tokens = {
				accessToken,
				refreshToken
			}

			const result = await new AuthController().refreshToken(tokens)
			return {
				status: StatusCodes.Ok,
				result
			}
		})
	]
}

const routes: Route[] = [
	token
]
export default routes