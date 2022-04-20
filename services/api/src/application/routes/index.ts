import { makeController, Route, StatusCodes } from '@utils/commons'
import { appId } from '@utils/environment'
import authRoutes from './auth'
import { pushRoutes } from './push'
import { storageRoutes } from './storage'

export const routes: Route[] = [
	...authRoutes,
	...pushRoutes,
	...storageRoutes,
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