import { makeController, Route, StatusCodes } from '@utils/commons'
import { appId } from '@utils/environment'
import storageRoutes from './storage'
import pushRoutes from './push'

export const routes: Route[] = [
	...storageRoutes,
	...pushRoutes,
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