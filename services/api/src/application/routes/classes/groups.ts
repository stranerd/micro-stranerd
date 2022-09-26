import { makeController, Route, StatusCodes } from '@utils/app/package'
import { GroupController } from '../../controllers/classes/groups'
import { isAuthenticated } from '@application/middlewares'

export const groupsRoutes: Route[] = [
	{
		path: '/classes/groups/:classId',
		method: 'get',
		controllers: [
			isAuthenticated,
			makeController(async (req) => {
				return {
					status: StatusCodes.Ok,
					result: await GroupController.GetGroup(req)
				}
			})
		]
	},
	{
		path: '/classes/groups/:classId/:id',
		method: 'get',
		controllers: [
			isAuthenticated,
			makeController(async (req) => {
				return {
					status: StatusCodes.Ok,
					result: await GroupController.FindGroup(req)
				}
			})
		]
	},
	{
		path: '/classes/groups/:classId/:id',
		method: 'put',
		controllers: [
			isAuthenticated,
			makeController(async (req) => {
				return {
					status: StatusCodes.Ok,
					result: await GroupController.UpdateGroup(req)
				}
			})
		]
	},
	{
		path: '/classes/groups/:classId/',
		method: 'post',
		controllers: [
			isAuthenticated,
			makeController(async (req) => {
				return {
					status: StatusCodes.Ok,
					result: await GroupController.CreateGroup(req)
				}
			})
		]
	},
	{
		path: '/classes/groups/:classId/:id',
		method: 'delete',
		controllers: [
			isAuthenticated,
			makeController(async (req) => {
				return {
					status: StatusCodes.Ok,
					result: await GroupController.DeleteGroup(req)
				}
			})
		]
	}
]