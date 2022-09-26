import { makeController, Route, StatusCodes } from '@utils/app/package'
import { DepartmentController } from '../../controllers/school/departments'
import { isAdmin, isAuthenticated } from '@application/middlewares'

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
			isAuthenticated, isAdmin,
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
			isAuthenticated, isAdmin,
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
			isAuthenticated, isAdmin,
			makeController(async (req) => {
				return {
					status: StatusCodes.Ok,
					result: await DepartmentController.DeleteDepartment(req)
				}
			})
		]
	}
]