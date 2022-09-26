import { makeController, Route, StatusCodes } from '@utils/app/package'
import { AnnouncementController } from '../../controllers/classes/announcements'
import { isAuthenticated } from '@application/middlewares'

export const announcementsRoutes: Route[] = [
	{
		path: '/classes/announcements/:classId',
		method: 'get',
		controllers: [
			isAuthenticated,
			makeController(async (req) => {
				return {
					status: StatusCodes.Ok,
					result: await AnnouncementController.GetAnnouncement(req)
				}
			})
		]
	},
	{
		path: '/classes/announcements/:classId/:id',
		method: 'get',
		controllers: [
			isAuthenticated,
			makeController(async (req) => {
				return {
					status: StatusCodes.Ok,
					result: await AnnouncementController.FindAnnouncement(req)
				}
			})
		]
	},
	{
		path: '/classes/announcements/:classId/:id',
		method: 'put',
		controllers: [
			isAuthenticated,
			makeController(async (req) => {
				return {
					status: StatusCodes.Ok,
					result: await AnnouncementController.UpdateAnnouncement(req)
				}
			})
		]
	},
	{
		path: '/classes/announcements/:classId/',
		method: 'post',
		controllers: [
			isAuthenticated,
			makeController(async (req) => {
				return {
					status: StatusCodes.Ok,
					result: await AnnouncementController.CreateAnnouncement(req)
				}
			})
		]
	},
	{
		path: '/classes/announcements/:classId/:id',
		method: 'delete',
		controllers: [
			isAuthenticated,
			makeController(async (req) => {
				return {
					status: StatusCodes.Ok,
					result: await AnnouncementController.DeleteAnnouncement(req)
				}
			})
		]
	},
	{
		path: '/classes/announcements/:classId/read',
		method: 'post',
		controllers: [
			isAuthenticated,
			makeController(async (req) => {
				return {
					status: StatusCodes.Ok,
					result: await AnnouncementController.MarkRead(req)
				}
			})
		]
	}
]