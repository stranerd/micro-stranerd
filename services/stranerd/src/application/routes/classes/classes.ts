import { makeController, requireAuthUser, Route, StatusCodes } from '@utils/commons'
import { ClassController } from '../../controllers/classes/classes'

export const classesRoutes: Route[] = [
	{
		path: '/classes/classes',
		method: 'get',
		controllers: [
			makeController(async (req) => {
				return {
					status: StatusCodes.Ok,
					result: await ClassController.GetClass(req)
				}
			})
		]
	},
	{
		path: '/classes/classes/:id',
		method: 'get',
		controllers: [
			makeController(async (req) => {
				return {
					status: StatusCodes.Ok,
					result: await ClassController.FindClass(req)
				}
			})
		]
	},
	{
		path: '/classes/classes/:id',
		method: 'put',
		controllers: [
			requireAuthUser,
			makeController(async (req) => {
				return {
					status: StatusCodes.Ok,
					result: await ClassController.UpdateClass(req)
				}
			})
		]
	},
	{
		path: '/classes/classes',
		method: 'post',
		controllers: [
			requireAuthUser,
			makeController(async (req) => {
				return {
					status: StatusCodes.Ok,
					result: await ClassController.CreateClass(req)
				}
			})
		]
	},
	{
		path: '/classes/classes/:id',
		method: 'delete',
		controllers: [
			requireAuthUser,
			makeController(async (req) => {
				return {
					status: StatusCodes.Ok,
					result: await ClassController.DeleteClass(req)
				}
			})
		]
	}
]