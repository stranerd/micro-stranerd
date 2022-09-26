import { makeController, Route, StatusCodes } from '@utils/app/package'
import { EventController } from '../../controllers/classes/events'
import { isAuthenticated } from '@application/middlewares'

export const eventsRoutes: Route[] = [
	{
		path: '/classes/events/:classId',
		method: 'get',
		controllers: [
			isAuthenticated,
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
			isAuthenticated,
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
			isAuthenticated,
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
			isAuthenticated,
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
			isAuthenticated,
			makeController(async (req) => {
				return {
					status: StatusCodes.Ok,
					result: await EventController.DeleteEvent(req)
				}
			})
		]
	},
	{
		path: '/classes/events/:classId/read',
		method: 'post',
		controllers: [
			isAuthenticated,
			makeController(async (req) => {
				return {
					status: StatusCodes.Ok,
					result: await EventController.MarkRead(req)
				}
			})
		]
	}
]