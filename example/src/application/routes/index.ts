import { makeController, Route, StatusCodes } from '@utils/commons'
import userRoutes from './users'
import eventRoutes from './events'
import cacheRoutes from './cache'

export const routes: Route[] = [
	...userRoutes,
	...eventRoutes,
	...cacheRoutes,
	{
		path: '/',
		method: 'get',
		controllers: [
			makeController(async () => {
				return {
					status: StatusCodes.Ok,
					result: 'Example service running'
				}
			})
		]
	}
]