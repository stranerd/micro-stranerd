import { makeController, requireAuthUser, Route, StatusCodes } from '@utils/commons'
import { InstitutionController } from '../../controllers/school/institutions'
import { isAdmin } from '@application/middlewares/isAdmin'

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
			requireAuthUser,
			isAdmin,
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
			requireAuthUser,
			isAdmin,
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
			requireAuthUser,
			isAdmin,
			makeController(async (req) => {
				return {
					status: StatusCodes.Ok,
					result: await InstitutionController.DeleteInstitution(req)
				}
			})
		]
	}
]