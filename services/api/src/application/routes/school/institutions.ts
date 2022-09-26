import { makeController, Route, StatusCodes } from '@utils/app/package'
import { InstitutionController } from '../../controllers/school/institutions'
import { isAdmin, isAuthenticated } from '@application/middlewares'

export const institutionsRoutes: Route[] = [
	{
		path: '/school/institutions',
		method: 'get',
		controllers: [
			makeController(async (req) => {
				return {
					status: StatusCodes.Ok,
					result: await InstitutionController.GetInstitutions(req)
				}
			})
		]
	},
	{
		path: '/school/institutions/:id',
		method: 'get',
		controllers: [
			makeController(async (req) => {
				return {
					status: StatusCodes.Ok,
					result: await InstitutionController.FindInstitution(req)
				}
			})
		]
	},
	{
		path: '/school/institutions',
		method: 'post',
		controllers: [
			isAuthenticated, isAdmin,
			makeController(async (req) => {
				return {
					status: StatusCodes.Ok,
					result: await InstitutionController.CreateInstitution(req)
				}
			})
		]
	},
	{
		path: '/school/institutions/:id',
		method: 'put',
		controllers: [
			isAuthenticated, isAdmin,
			makeController(async (req) => {
				return {
					status: StatusCodes.Ok,
					result: await InstitutionController.UpdateInstitution(req)
				}
			})
		]
	},
	{
		path: '/school/institutions/:id',
		method: 'delete',
		controllers: [
			isAuthenticated, isAdmin,
			makeController(async (req) => {
				return {
					status: StatusCodes.Ok,
					result: await InstitutionController.DeleteInstitution(req)
				}
			})
		]
	}
]