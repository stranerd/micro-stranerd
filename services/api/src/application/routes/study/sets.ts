import { makeController, requireAuthUser, Route, StatusCodes } from '@utils/commons'
import { SetController } from '../../controllers/study/sets'

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
		path: '/study/sets/:id',
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
		path: '/study/sets/:id/save',
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
		path: '/study/sets/:id/delete',
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
		path: '/study/sets/:id',
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