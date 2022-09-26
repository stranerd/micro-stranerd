import { makeController, Route, StatusCodes } from '@utils/app/package'
import { BadgesController } from '../../controllers/users/badges'
import { isAuthenticated } from '@application/middlewares'

export const badgesRoutes: Route[] = [
	{
		path: '/users/badges/',
		method: 'get',
		controllers: [
			isAuthenticated,
			makeController(async (req) => {
				return {
					status: StatusCodes.Ok,
					result: await BadgesController.get(req)
				}
			})
		]
	}
]