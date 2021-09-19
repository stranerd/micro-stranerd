import { makeController, Route, StatusCodes } from '@utils/commons'
import emailRoutes from './emails'
import passwordRoutes from './passwords'
import userRoutes from './user'
import tokenRoutes from './token'
import identityRoutes from './identities'
import { appId } from '@utils/environment'

export const routes: Route[] = [
	...emailRoutes,
	...passwordRoutes,
	...userRoutes,
	...tokenRoutes,
	...identityRoutes,
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