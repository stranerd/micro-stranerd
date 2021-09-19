import { makeController, Route, StatusCodes } from '@utils/commons'
import { appId } from '@utils/environment'

export const routes: Route[] = [
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