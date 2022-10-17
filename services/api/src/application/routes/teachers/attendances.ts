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
	}
]