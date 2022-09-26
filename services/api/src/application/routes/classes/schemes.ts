import { makeController, Route, StatusCodes } from '@utils/app/package'
import { SchemeController } from '../../controllers/classes/schemes'
import { isAuthenticated } from '@application/middlewares'

export const schemesRoutes: Route[] = [
	{
		path: '/classes/schemes/:classId',
		method: 'get',
		controllers: [
			isAuthenticated,
			makeController(async (req) => {
				return {
					status: StatusCodes.Ok,
					result: await SchemeController.GetScheme(req)
				}
			})
		]
	},
	{
		path: '/classes/schemes/:classId/:id',
		method: 'get',
		controllers: [
			isAuthenticated,
			makeController(async (req) => {
				return {
					status: StatusCodes.Ok,
					result: await SchemeController.FindScheme(req)
				}
			})
		]
	},
	{
		path: '/classes/schemes/:classId/:id',
		method: 'put',
		controllers: [
			isAuthenticated,
			makeController(async (req) => {
				return {
					status: StatusCodes.Ok,
					result: await SchemeController.UpdateScheme(req)
				}
			})
		]
	},
	{
		path: '/classes/schemes/:classId/',
		method: 'post',
		controllers: [
			isAuthenticated,
			makeController(async (req) => {
				return {
					status: StatusCodes.Ok,
					result: await SchemeController.CreateScheme(req)
				}
			})
		]
	},
	{
		path: '/classes/schemes/:classId/:id',
		method: 'delete',
		controllers: [
			isAuthenticated,
			makeController(async (req) => {
				return {
					status: StatusCodes.Ok,
					result: await SchemeController.DeleteScheme(req)
				}
			})
		]
	},
	{
		path: '/classes/schemes/:classId/read',
		method: 'post',
		controllers: [
			isAuthenticated,
			makeController(async (req) => {
				return {
					status: StatusCodes.Ok,
					result: await SchemeController.MarkRead(req)
				}
			})
		]
	}
]