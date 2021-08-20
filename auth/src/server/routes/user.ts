import { makeController, requireAuthUser, Route, StatusCodes } from '@utils/commons'
import { UserController } from '../../controller/user'

const getUserDetails: Route = {
	path: '/user',
	method: 'get',
	controllers: [
		requireAuthUser,
		makeController(async (req) => {

			const userId = req.authUser?.id

			if (userId) {
				const result = await new UserController().getUserDetails(userId)
				return {
					status: StatusCodes.Ok,
					result
				}
			} else {
				return {
					status: StatusCodes.NotAuthenticated,
					result: 'user not authenticated'
				}
			}

		})
	]
}

const updateUserRole: Route = {
	path: '/roles',
	method: 'post',
	controllers: [
		requireAuthUser,
		makeController(async (req) => {

			const roleInput = {
				app: req.body.app,
				role: req.body.role,
				userId: req.body.userId,
				value: req.body.value
			}

			const result = await new UserController().updateUserRole(roleInput)

			return {
				status: StatusCodes.Ok,
				result
			}

		})
	]
}

const routes: Route[] = [getUserDetails, updateUserRole]
export default routes