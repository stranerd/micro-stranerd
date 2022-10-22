import { makeController, Route, StatusCodes } from '@utils/app/package'
import { AttendanceController } from '../../controllers/teachers/attendances'
import { isAuthenticated } from '@application/middlewares'

export const attendancesRoutes: Route[] = [
	{
		path: '/teachers/:courseId/attendances',
		method: 'get',
		controllers: [
			makeController(async (req) => {
				return {
					status: StatusCodes.Ok,
					result: await AttendanceController.GetAttendance(req)
				}
			})
		]
	},
	{
		path: '/teachers/:courseId/attendances/:id',
		method: 'get',
		controllers: [
			makeController(async (req) => {
				return {
					status: StatusCodes.Ok,
					result: await AttendanceController.FindAttendance(req)
				}
			})
		]
	},
	{
		path: '/teachers/:courseId/attendances/:id',
		method: 'put',
		controllers: [
			isAuthenticated,
			makeController(async (req) => {
				return {
					status: StatusCodes.Ok,
					result: await AttendanceController.UpdateAttendance(req)
				}
			})
		]
	},
	{
		path: '/teachers/:courseId/attendances',
		method: 'post',
		controllers: [
			isAuthenticated,
			makeController(async (req) => {
				return {
					status: StatusCodes.Ok,
					result: await AttendanceController.CreateAttendance(req)
				}
			})
		]
	},
	{
		path: '/teachers/:courseId/attendances/:id',
		method: 'delete',
		controllers: [
			isAuthenticated,
			makeController(async (req) => {
				return {
					status: StatusCodes.Ok,
					result: await AttendanceController.DeleteAttendance(req)
				}
			})
		]
	},
	{
		path: '/teachers/:courseId/attendances/:id/close',
		method: 'post',
		controllers: [
			isAuthenticated,
			makeController(async (req) => {
				return {
					status: StatusCodes.Ok,
					result: await AttendanceController.CloseAttendance(req)
				}
			})
		]
	},
	{
		path: '/teachers/:courseId/attendances/:id/token',
		method: 'post',
		controllers: [
			isAuthenticated,
			makeController(async (req) => {
				return {
					status: StatusCodes.Ok,
					result: await AttendanceController.GenerateToken(req)
				}
			})
		]
	},
	{
		path: '/teachers/:courseId/attendances/:id/tick',
		method: 'post',
		controllers: [
			isAuthenticated,
			makeController(async (req) => {
				return {
					status: StatusCodes.Ok,
					result: await AttendanceController.TickAttendance(req)
				}
			})
		]
	}
]