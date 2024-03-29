import { makeController, Route, StatusCodes } from '@utils/app/package'
import { NotificationsController } from '../../controllers/users/notifications'
import { isAuthenticated } from '@application/middlewares'

export const notificationsRoutes: Route[] = [
	{
		path: '/users/notifications/',
		method: 'get',
		controllers: [
			isAuthenticated,
			makeController(async (req) => {
				return {
					status: StatusCodes.Ok,
					result: await NotificationsController.getNotifications(req)
				}
			})
		]
	},
	{
		path: '/users/notifications/:id',
		method: 'get',
		controllers: [
			isAuthenticated,
			makeController(async (req) => {
				return {
					status: StatusCodes.Ok,
					result: await NotificationsController.findNotification(req)
				}
			})
		]
	},
	{
		path: '/users/notifications/seen',
		method: 'put',
		controllers: [
			isAuthenticated,
			makeController(async (req) => {
				return {
					status: StatusCodes.Ok,
					result: await NotificationsController.markAllNotificationsSeen(req)
				}
			})
		]
	},
	{
		path: '/users/notifications/:id/seen',
		method: 'put',
		controllers: [
			isAuthenticated,
			makeController(async (req) => {
				return {
					status: StatusCodes.Ok,
					result: await NotificationsController.markNotificationSeen(req)
				}
			})
		]
	}
]