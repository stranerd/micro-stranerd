import { makeController, Route } from '../../commons'

export const routes: Route[] = [
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