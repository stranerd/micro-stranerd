import { makeController, Route, StatusCodes } from '@utils/commons'
import { appId } from '@utils/environment'
import { usersRoutes } from './users'

export const routes: Route[] = [
	...usersRoutes,
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