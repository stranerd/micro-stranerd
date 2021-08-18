import { makeController, Route, StatusCodes } from '@utils/commons'
import userRoutes from './users'
import eventRoutes from './events'

export const routes: Route[] = [
	...userRoutes,
	...eventRoutes,
	{
		path: '/',
		method: 'get',
		controllers: [
			makeController( async () => {
				return {
					status: StatusCodes.Ok,
					result: { hello: 'Hello World' }
				}
			})
		]
	}
]