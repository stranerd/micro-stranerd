import { makeController, requireAuthUser, Route, StatusCodes } from '@utils/commons'
import { EventController } from '../../controllers/classes/events'

export const eventsRoutes: Route[] = [
	{
		path: '/classes/events/:classId',
		method: 'get',
		controllers: [
			requireAuthUser,
			makeController(async (req) => {
				return {
					status: StatusCodes.Ok,
					result: await EventController.GetEvent(req)
				}
			})
		]
	},
	{
		path: '/classes/events/:classId/:id',
		method: 'get',
		controllers: [
			requireAuthUser,
			makeController(async (req) => {
				return {
					status: StatusCodes.Ok,
					result: await EventController.FindEvent(req)
				}
			})
		]
	},
	{
		path: '/classes/events/:classId/:id',
		method: 'put',
		controllers: [
			requireAuthUser,
			makeController(async (req) => {
				return {
					status: StatusCodes.Ok,
					result: await EventController.UpdateEvent(req)
				}
			})
		]
	},
	{
		path: '/classes/events/:classId/',
		method: 'post',
		controllers: [
			requireAuthUser,
			makeController(async (req) => {
				return {
					status: StatusCodes.Ok,
					result: await EventController.CreateEvent(req)
				}
			})
		]
	},
	{
		path: '/classes/events/:classId/:id',
		method: 'delete',
		controllers: [
			requireAuthUser,
			makeController(async (req) => {
				return {
					status: StatusCodes.Ok,
					result: await EventController.DeleteEvent(req)
				}
			})
		]
	}
]