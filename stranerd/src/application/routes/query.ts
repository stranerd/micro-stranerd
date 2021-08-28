import { makeController, parseQueryParams, Route, StatusCodes } from '@utils/commons'
import { UserFromModel } from '../../modules/users/data/models/users'
import { User } from '../../modules/users/data/mongooseModels/users'

const query: Route = {
	path: '/query/',
	method: 'get',
	controllers: [
		makeController(async (req) => {
			const result = await parseQueryParams<UserFromModel>(User, req.body)
			return {
				status: StatusCodes.Ok,
				result
			}
		})
	]
}

const routes: Route[] = [query]
export { routes as queryRoutes }
