import { makeController, requireAuthUser, Route, StatusCodes } from '@utils/app/package'
import { BadgesController } from '../../controllers/users/badges'

export const badgesRoutes: Route[] = [
	{
		path: '/users/badges/',
		method: 'get',
		controllers: [
			requireAuthUser,
			makeController(async (req) => {
				return {
					status: StatusCodes.Ok,
					result: await BadgesController.get(req)
				}
			})
		]
	}
]