import { makeController, Route, StatusCodes } from '@utils/commons'
import { appId } from '@utils/environment'
import { usersRoutes } from './users'
import { notificationsRoutes } from './notifications'

export const routes: Route[] = [
	...usersRoutes,
	...notificationsRoutes,
	{
		path: '/',
		method: 'get',
		controllers: [
			makeController(async () => {
				return {
					status: StatusCodes.Ok,
					result: `${ appId } service running`
				}
			})
		]
	}
]