import { makeController, Route, StatusCodes } from '@utils/commons'
import { SearchController } from '../../controllers/common/search'

export const searchRoutes: Route[] = [
	{
		path: '/search/:query',
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