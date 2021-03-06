import { makeController, requireAuthUser, Route, StatusCodes } from '@utils/commons'
import { NotificationsController } from '../../controllers/users/notifications'

export const notificationsRoutes: Route[] = [
	{
		path: '/users/notifications/',
		method: 'get',
		controllers: [
			requireAuthUser,
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
			requireAuthUser,
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
			requireAuthUser,
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
			requireAuthUser,
			makeController(async (req) => {
				return {
					status: StatusCodes.Ok,
					result: await NotificationsController.markNotificationSeen(req)
				}
			})
		]
	}
]