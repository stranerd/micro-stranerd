import { makeController, requireAuthUser, Route, StatusCodes } from '@utils/commons'
import { GroupController } from '../../controllers/classes/groups'

export const groupsRoutes: Route[] = [
	{
		path: '/classes/groups/:classId',
		method: 'get',
		controllers: [
			requireAuthUser,
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
			requireAuthUser,
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
			requireAuthUser,
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
			requireAuthUser,
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
			requireAuthUser,
			makeController(async (req) => {
				return {
					status: StatusCodes.Ok,
					result: await GroupController.DeleteGroup(req)
				}
			})
		]
	}
]