import { makeController, Route, StatusCodes } from '@utils/app/package'
import { SetController } from '../../controllers/study/sets'
import { isAuthenticated } from '@application/middlewares'

export const setsRoutes: Route[] = [
	{
		path: '/study/sets',
		method: 'get',
		controllers: [
			makeController(async (req) => {
				return {
					status: StatusCodes.Ok,
					result: await SetController.GetSets(req)
				}
			})
		]
	},
	{
		path: '/study/sets/:id',
		method: 'get',
		controllers: [
			makeController(async (req) => {
				return {
					status: StatusCodes.Ok,
					result: await SetController.FindSet(req)
				}
			})
		]
	},
	{
		path: '/study/sets',
		method: 'post',
		controllers: [
			isAuthenticated,
			makeController(async (req) => {
				return {
					status: StatusCodes.Ok,
					result: await SetController.CreateSet(req)
				}
			})
		]
	},
	{
		path: '/study/sets/:id',
		method: 'put',
		controllers: [
			isAuthenticated,
			makeController(async (req) => {
				return {
					status: StatusCodes.Ok,
					result: await SetController.UpdateSet(req)
				}
			})
		]
	},
	{
		path: '/study/sets/:id/save',
		method: 'put',
		controllers: [
			isAuthenticated,
			makeController(async (req) => {
				return {
					status: StatusCodes.Ok,
					result: await SetController.SaveProp(req)
				}
			})
		]
	},
	{
		path: '/study/sets/:id',
		method: 'delete',
		controllers: [
			isAuthenticated,
			makeController(async (req) => {
				return {
					status: StatusCodes.Ok,
					result: await SetController.DeleteSet(req)
				}
			})
		]
	}
]