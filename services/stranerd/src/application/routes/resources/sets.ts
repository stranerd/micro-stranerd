import { makeController, requireAuthUser, Route, StatusCodes } from '@utils/commons'
import { SetController } from '../../controllers/resources/sets'

export const setsRoutes: Route[] = [
	{
		path: '/resources/sets',
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
		path: '/resources/sets/:id',
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
		path: '/resources/sets',
		method: 'post',
		controllers: [
			requireAuthUser,
			makeController(async (req) => {
				return {
					status: StatusCodes.Ok,
					result: await SetController.CreateSet(req)
				}
			})
		]
	},
	{
		path: '/resources/sets/:id',
		method: 'put',
		controllers: [
			requireAuthUser,
			makeController(async (req) => {
				return {
					status: StatusCodes.Ok,
					result: await SetController.UpdateSet(req)
				}
			})
		]
	},
	{
		path: '/resources/sets/:id/save',
		method: 'put',
		controllers: [
			requireAuthUser,
			makeController(async (req) => {
				return {
					status: StatusCodes.Ok,
					result: await SetController.SaveProp(req)
				}
			})
		]
	},
	{
		path: '/resources/sets/:id/delete',
		method: 'put',
		controllers: [
			requireAuthUser,
			makeController(async (req) => {
				return {
					status: StatusCodes.Ok,
					result: await SetController.DeleteProp(req)
				}
			})
		]
	},
	{
		path: '/resources/sets/:id',
		method: 'delete',
		controllers: [
			requireAuthUser,
			makeController(async (req) => {
				return {
					status: StatusCodes.Ok,
					result: await SetController.DeleteSet(req)
				}
			})
		]
	}
]