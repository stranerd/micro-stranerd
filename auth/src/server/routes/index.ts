import { makeController, Route, StatusCodes } from '@utils/commons'
import authRoutes from './auth'
import userRoutes from './user'
import { appId } from '@utils/environment'

export const routes: Route[] = [
	...authRoutes,
	...userRoutes,
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