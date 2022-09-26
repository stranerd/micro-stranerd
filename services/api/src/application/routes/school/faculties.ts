import { makeController, Route, StatusCodes } from '@utils/app/package'
import { FacultyController } from '../../controllers/school/faculties'
import { isAdmin, isAuthenticated } from '@application/middlewares'

export const facultiesRoutes: Route[] = [
	{
		path: '/school/faculties',
		method: 'get',
		controllers: [
			makeController(async (req) => {
				return {
					status: StatusCodes.Ok,
					result: await FacultyController.GetFaculties(req)
				}
			})
		]
	},
	{
		path: '/school/faculties/:id',
		method: 'get',
		controllers: [
			makeController(async (req) => {
				return {
					status: StatusCodes.Ok,
					result: await FacultyController.FindFaculty(req)
				}
			})
		]
	},
	{
		path: '/school/faculties',
		method: 'post',
		controllers: [
			isAuthenticated, isAdmin,
			makeController(async (req) => {
				return {
					status: StatusCodes.Ok,
					result: await FacultyController.CreateFaculty(req)
				}
			})
		]
	},
	{
		path: '/school/faculties/:id',
		method: 'put',
		controllers: [
			isAuthenticated, isAdmin,
			makeController(async (req) => {
				return {
					status: StatusCodes.Ok,
					result: await FacultyController.UpdateFaculty(req)
				}
			})
		]
	},
	{
		path: '/school/faculties/:id',
		method: 'delete',
		controllers: [
			isAuthenticated, isAdmin,
			makeController(async (req) => {
				return {
					status: StatusCodes.Ok,
					result: await FacultyController.DeleteFaculty(req)
				}
			})
		]
	}
]