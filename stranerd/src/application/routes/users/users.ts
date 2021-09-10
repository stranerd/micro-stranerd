import { makeController, requireAuthUser, Route, StatusCodes } from '@utils/commons'
import { UsersController } from '../../controllers/users/users'

export const usersRoutes: Route[] = [
	{
		path: '/users/streak',
		method: 'post',
		controllers: [
			requireAuthUser,
			makeController(async (req) => {
				return {
					status: StatusCodes.Ok,
					result: await UsersController.updateStreak(req)
				}
			})
		]
	},
	{
		path: '/users/',
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
		path: '/users/:id',
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