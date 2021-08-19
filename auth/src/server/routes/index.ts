import { makeController, Route, StatusCodes } from '@utils/commons'
import authRoutes from './auth'
import userRoutes from './user'

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
					result: 'Auth service running'
				}
			})
		]
	}
]