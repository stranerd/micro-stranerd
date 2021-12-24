import { makeController, Route, StatusCodes } from '@utils/commons'
import { SearchController } from '../../controllers/meta/search'

export const searchRoutes: Route[] = [
	{
		path: '/meta/search',
		method: 'get',
		controllers: [
			makeController(async (req) => {
				return {
					status: StatusCodes.Ok,
					result: await SearchController.Search(req)
				}
			})
		]
	}
]