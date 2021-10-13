import { makeController, Route, StatusCodes } from '@utils/commons'
import { IdentitiesController } from '../controllers'

const googleSignIn: Route = {
	path: '/identities/google',
	method: 'post',
	controllers: [
		makeController(async (req) => {
			return {
				status: StatusCodes.Ok,
				result: await IdentitiesController.googleSignIn(req)
			}
		})
	]
}

const routes: Route[] = [googleSignIn]
export default routes