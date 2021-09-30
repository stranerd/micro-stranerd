import { makeController, Route, StatusCodes } from '@utils/commons'
import { appId } from '@utils/environment'
import fileRoutes from './files'

export const routes: Route[] = [
	...fileRoutes,
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