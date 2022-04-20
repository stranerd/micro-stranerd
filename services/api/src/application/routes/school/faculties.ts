import { makeController, requireAuthUser, Route, StatusCodes } from '@utils/commons'
import { FacultyController } from '../../controllers/school/faculties'
import { isAdmin } from '@application/middlewares/isAdmin'

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
			requireAuthUser,
			isAdmin,
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
			requireAuthUser,
			isAdmin,
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
			requireAuthUser,
			isAdmin,
			makeController(async (req) => {
				return {
					status: StatusCodes.Ok,
					result: await FacultyController.DeleteFaculty(req)
				}
			})
		]
	}
]