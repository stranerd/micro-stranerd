import { makeController, Route, StatusCodes } from '@utils/commons'
import authRoutes from './auth'


export const routes: Route[] = [
	...authRoutes,
	{
		path: '/',
		method: 'get',
		controllers: [
			makeController(async () => {
				return {
					status: StatusCodes.Ok,
					result: { hello: 'Auth service running' }
				}
			})
		]
	}
]