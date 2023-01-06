import { ReportController } from '@application/controllers/moderation/reports'
import { makeController, Route, StatusCodes } from '@utils/app/package'
import { isAdmin, isAuthenticated } from '@application/middlewares'

export const reportRoutes: Route[] = [
	{
		path: '/moderation/reports',
		method: 'get',
		controllers: [
			isAuthenticated, isAdmin,
			makeController(async (req) => {
				return {
					status: StatusCodes.Ok,
					result: await ReportController.GetReports(req)
				}
			})
		]
	},
	{
		path: '/moderation/reports/:id',
		method: 'get',
		controllers: [
			isAuthenticated, isAdmin,
			makeController(async (req) => {
				return {
					status: StatusCodes.Ok,
					result: await ReportController.FindReport(req)
				}
			})
		]
	},
	{
		path: '/moderation/reports/:id',
		method: 'delete',
		controllers: [
			isAuthenticated, isAdmin,
			makeController(async (req) => {
				return {
					status: StatusCodes.Ok,
					result: await ReportController.DeleteReport(req)
				}
			})
		]
	},
	{
		path: '/moderation/reports',
		method: 'post',
		controllers: [
			isAuthenticated,
			makeController(async (req) => {
				return {
					status: StatusCodes.Ok,
					result: await ReportController.CreateReport(req)
				}
			})
		]
	}
]