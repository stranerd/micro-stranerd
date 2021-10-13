import { makeController, Route, StatusCodes } from '@utils/commons'
import { TokenController } from '../controllers'

const getNewTokens: Route = {
	path: '/token',
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

const routes: Route[] = [getNewTokens]
export default routes