import { makeController, requireAuthUser, Route, StatusCodes } from '@utils/commons'
import { UsersController } from '../../controllers/users/users'

export const usersRoutes: Route[] = [
	{
		path: '/users/users/school',
		method: 'put',
		controllers: [
			requireAuthUser,
			makeController(async (req) => {
				return {
					status: StatusCodes.Ok,
					result: await UsersController.updateSchool(req)
				}
			})
		]
	},
	{
		path: '/users/users/',
		method: 'get',
		controllers: [
			makeController(async (req) => {
				return {
					status: StatusCodes.Ok,
					result: await UsersController.getUsers(req)
				}
			})
		]
	},
	{
		path: '/users/users/:id',
		method: 'get',
		controllers: [
			makeController(async (req) => {
				return {
					status: StatusCodes.Ok,
					result: await UsersController.findUser(req)
				}
			})
		]
	}
]