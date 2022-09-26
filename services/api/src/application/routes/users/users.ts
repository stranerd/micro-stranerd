import { makeController, Route, StatusCodes } from '@utils/app/package'
import { UsersController } from '../../controllers/users/users'
import { isAuthenticated } from '@application/middlewares'

export const usersRoutes: Route[] = [
	{
		path: '/users/users/school',
		method: 'put',
		controllers: [
			isAuthenticated,
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