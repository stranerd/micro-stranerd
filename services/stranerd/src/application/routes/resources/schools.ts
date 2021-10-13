import { makeController, requireAuthUser, Route, StatusCodes } from '@utils/commons'
import { SchoolController } from '../../controllers/resources/schools'
import { isAdmin } from '@application/middlewares/isAdmin'

export const schoolsRoutes: Route[] = [
	{
		path: '/resources/schools',
		method: 'get',
		controllers: [
			makeController(async (req) => {
				return {
					status: StatusCodes.Ok,
					result: await SchoolController.GetSchools(req)
				}
			})
		]
	},
	{
		path: '/resources/schools/:id',
		method: 'get',
		controllers: [
			makeController(async (req) => {
				return {
					status: StatusCodes.Ok,
					result: await SchoolController.FindSchool(req)
				}
			})
		]
	},
	{
		path: '/resources/schools',
		method: 'post',
		controllers: [
			requireAuthUser,
			isAdmin,
			makeController(async (req) => {
				return {
					status: StatusCodes.Ok,
					result: await SchoolController.CreateSchool(req)
				}
			})
		]
	},
	{
		path: '/resources/schools/:id',
		method: 'put',
		controllers: [
			requireAuthUser,
			isAdmin,
			makeController(async (req) => {
				return {
					status: StatusCodes.Ok,
					result: await SchoolController.UpdateSchool(req)
				}
			})
		]
	},
	{
		path: '/resources/schools/:id',
		method: 'delete',
		controllers: [
			requireAuthUser,
			isAdmin,
			makeController(async (req) => {
				return {
					status: StatusCodes.Ok,
					result: await SchoolController.DeleteSchool(req)
				}
			})
		]
	}
]