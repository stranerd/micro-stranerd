import { makeController, requireAuthUser, Route, StatusCodes } from '@utils/commons'
import { CourseController } from '../../controllers/resources/courses'
import { isAdmin } from '@application/middlewares/isAdmin'

export const coursesRoutes: Route[] = [
	{
		path: '/resources/courses',
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
		path: '/resources/courses/:id',
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
		path: '/resources/courses',
		method: 'post',
		controllers: [
			requireAuthUser,
			isAdmin,
			makeController(async (req) => {
				return {
					status: StatusCodes.Ok,
					result: await CourseController.CreateCourse(req)
				}
			})
		]
	},
	{
		path: '/resources/courses/:id',
		method: 'put',
		controllers: [
			requireAuthUser,
			isAdmin,
			makeController(async (req) => {
				return {
					status: StatusCodes.Ok,
					result: await CourseController.UpdateCourse(req)
				}
			})
		]
	},
	{
		path: '/resources/courses/:id',
		method: 'delete',
		controllers: [
			requireAuthUser,
			isAdmin,
			makeController(async (req) => {
				return {
					status: StatusCodes.Ok,
					result: await CourseController.DeleteCourse(req)
				}
			})
		]
	}
]