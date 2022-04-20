import { makeController, requireAuthUser, Route, StatusCodes } from '@utils/commons'
import { DepartmentController } from '../../controllers/school/departments'
import { isAdmin } from '@application/middlewares/isAdmin'

export const departmentsRoutes: Route[] = [
	{
		path: '/school/departments',
		method: 'get',
		controllers: [
			makeController(async (req) => {
				return {
					status: StatusCodes.Ok,
					result: await DepartmentController.GetDepartments(req)
				}
			})
		]
	},
	{
		path: '/school/departments/:id',
		method: 'get',
		controllers: [
			makeController(async (req) => {
				return {
					status: StatusCodes.Ok,
					result: await DepartmentController.FindDepartment(req)
				}
			})
		]
	},
	{
		path: '/school/departments',
		method: 'post',
		controllers: [
			requireAuthUser,
			isAdmin,
			makeController(async (req) => {
				return {
					status: StatusCodes.Ok,
					result: await DepartmentController.CreateDepartment(req)
				}
			})
		]
	},
	{
		path: '/school/departments/:id',
		method: 'put',
		controllers: [
			requireAuthUser,
			isAdmin,
			makeController(async (req) => {
				return {
					status: StatusCodes.Ok,
					result: await DepartmentController.UpdateDepartment(req)
				}
			})
		]
	},
	{
		path: '/school/departments/:id',
		method: 'delete',
		controllers: [
			requireAuthUser,
			isAdmin,
			makeController(async (req) => {
				return {
					status: StatusCodes.Ok,
					result: await DepartmentController.DeleteDepartment(req)
				}
			})
		]
	}
]