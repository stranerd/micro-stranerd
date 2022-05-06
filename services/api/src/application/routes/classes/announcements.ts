import { makeController, requireAuthUser, Route, StatusCodes } from '@utils/commons'
import { AnnouncementController } from '../../controllers/classes/announcements'

export const announcementsRoutes: Route[] = [
	{
		path: '/classes/announcements/:classId',
		method: 'get',
		controllers: [
			requireAuthUser,
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
			requireAuthUser,
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
			requireAuthUser,
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
			requireAuthUser,
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
			requireAuthUser,
			makeController(async (req) => {
				return {
					status: StatusCodes.Ok,
					result: await AnnouncementController.DeleteAnnouncement(req)
				}
			})
		]
	}
]