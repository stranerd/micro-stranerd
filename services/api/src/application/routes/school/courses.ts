import { makeController, Route, StatusCodes } from '@utils/app/package'
import { CourseController } from '../../controllers/school/courses'
import { isAdmin, isAuthenticated } from '@application/middlewares'

export const coursesRoutes: Route[] = [
	{
		path: '/school/courses',
		method: 'get',
		controllers: [
			makeController(async (req) => {
				return {
					status: StatusCodes.Ok,
					result: await CourseController.GetCourses(req)
				}
			})
		]
	},
	{
		path: '/school/courses/:id',
		method: 'get',
		controllers: [
			makeController(async (req) => {
				return {
					status: StatusCodes.Ok,
					result: await CourseController.FindCourse(req)
				}
			})
		]
	},
	{
		path: '/school/courses',
		method: 'post',
		controllers: [
			isAuthenticated, isAdmin,
			makeController(async (req) => {
				return {
					status: StatusCodes.Ok,
					result: await CourseController.CreateCourse(req)
				}
			})
		]
	},
	{
		path: '/school/courses/:id',
		method: 'put',
		controllers: [
			isAuthenticated, isAdmin,
			makeController(async (req) => {
				return {
					status: StatusCodes.Ok,
					result: await CourseController.UpdateCourse(req)
				}
			})
		]
	},
	{
		path: '/school/courses/:id',
		method: 'delete',
		controllers: [
			isAuthenticated, isAdmin,
			makeController(async (req) => {
				return {
					status: StatusCodes.Ok,
					result: await CourseController.DeleteCourse(req)
				}
			})
		]
	}
]