import { makeController, Route } from '../../commons'
import userRoutes from './users'
export const routes: Route[] = [
	...userRoutes,
	{
		path: '/test',
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