import { makeController, Route, StatusCodes } from '@utils/app/package'
import { AttendanceController } from '../../controllers/teachers/attendances'
import { isAuthenticated } from '@application/middlewares'

export const attendancesRoutes: Route[] = [
	{
		path: '/teachers/attendances/:courseId',
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
		path: '/teachers/attendances/:courseId/:id',
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
		path: '/teachers/attendances/:courseId/:id',
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
		path: '/teachers/attendances/:courseId',
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
		path: '/teachers/attendances/:courseId/:id',
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
		path: '/teachers/attendances/:courseId/:id/close',
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
		path: '/teachers/attendances/:courseId/:id/token',
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
		path: '/teachers/attendances/:courseId/:id/tick',
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