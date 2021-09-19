import { makeController, Route, StatusCodes } from '@utils/commons'
import userRoutes from './users'
import eventRoutes from './events'
import cacheRoutes from './cache'
import emailRoutes from './email'
import validateRoutes from './validate'
import { appId } from '@utils/environment'

export const routes: Route[] = [
	...userRoutes,
	...eventRoutes,
	...cacheRoutes,
	...emailRoutes,
	...validateRoutes,
	{
		path: '/',
		method: 'get',
		controllers: [
			makeController(async () => {
				return {
					status: StatusCodes.Ok,
					result: `${appId} service running`
				}
			})
		]
	}
]