import { makeController, Route, StatusCodes } from '@utils/app/package'
import { CourseController } from '../../controllers/teachers/courses'
import { isAuthenticated } from '@application/middlewares'

export const coursesRoutes: Route[] = [
	{
		path: '/teachers/courses',
		method: 'get',
		controllers: [
			makeController(async (req) => {
				return {
					status: StatusCodes.Ok,
					result: await CourseController.GetCourse(req)
				}
			})
		]
	},
	{
		path: '/teachers/courses/:id',
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
		path: '/teachers/courses/:id',
		method: 'put',
		controllers: [
			isAuthenticated,
			makeController(async (req) => {
				return {
					status: StatusCodes.Ok,
					result: await CourseController.UpdateCourse(req)
				}
			})
		]
	},
	{
		path: '/teachers/courses',
		method: 'post',
		controllers: [
			isAuthenticated,
			makeController(async (req) => {
				return {
					status: StatusCodes.Ok,
					result: await CourseController.CreateCourse(req)
				}
			})
		]
	},
	{
		path: '/teachers/courses/:id',
		method: 'delete',
		controllers: [
			isAuthenticated,
			makeController(async (req) => {
				return {
					status: StatusCodes.Ok,
					result: await CourseController.DeleteCourse(req)
				}
			})
		]
	},
	{
		path: '/teachers/courses/:id/join',
		method: 'post',
		controllers: [
			isAuthenticated,
			makeController(async (req) => {
				return {
					status: StatusCodes.Ok,
					result: await CourseController.DeleteCourse(req)
				}
			})
		]
	}
]