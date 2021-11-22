import { makeController, requireAuthUser, Route, StatusCodes } from '@utils/commons'
import { InstitutionController } from '../../controllers/study/institutions'
import { isAdmin } from '@application/middlewares/isAdmin'

export const institutionsRoutes: Route[] = [
	{
		path: '/study/institutions',
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
		path: '/study/institutions/:id',
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
		path: '/study/institutions',
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
		path: '/study/institutions/:id',
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
		path: '/study/institutions/:id',
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