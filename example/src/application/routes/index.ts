import { makeController, Route } from '@utils/commons'
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
					status: 200,
					result: { hello: 'Hello World' }
				}
			})
		]
	}
]