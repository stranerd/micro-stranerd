import { makeController, Route, StatusCodes } from '@utils/commons'
import { TokenController } from '../../controllers/auth/token'

const getNewTokens: Route = {
	path: '/auth/token',
	method: 'post',
	controllers: [
		makeController(async (req) => {
			return {
				status: StatusCodes.Ok,
				result: await TokenController.getNewTokens(req)
			}
		})
	]
}

export const tokenRoutes = [getNewTokens]
