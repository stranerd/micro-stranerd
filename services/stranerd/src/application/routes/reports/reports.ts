import { ReportController } from '@application/controllers/reports/reports'
import { makeController, requireAuthUser, Route, StatusCodes } from '@utils/commons'
import { isAdmin } from '@application/middlewares/isAdmin'

export const reportRoutes: Route[] = [
	{
		path: '/reports',
		method: 'get',
		controllers: [
			requireAuthUser, isAdmin,
			makeController(async (req) => {
				return {
					status: StatusCodes.Ok,
					result: await ReportController.GetReports(req)
				}
			})
		]
	},
	{
		path: '/reports/:id',
		method: 'get',
		controllers: [
			requireAuthUser, isAdmin,
			makeController(async (req) => {
				return {
					status: StatusCodes.Ok,
					result: await ReportController.FindReport(req)
				}
			})
		]
	},
	{
		path: '/reports/:id',
		method: 'delete',
		controllers: [
			requireAuthUser, isAdmin,
			makeController(async (req) => {
				return {
					status: StatusCodes.Ok,
					result: await ReportController.DeleteReport(req)
				}
			})
		]
	},
	{
		path: '/reports',
		method: 'post',
		controllers: [
			requireAuthUser,
			makeController(async (req) => {
				return {
					status: StatusCodes.Ok,
					result: await ReportController.CreateReport(req)
				}
			})
		]
	}
]