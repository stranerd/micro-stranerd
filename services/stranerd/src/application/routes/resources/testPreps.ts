import { makeController, requireAuthUser, Route, StatusCodes } from '@utils/commons'
import { TestPrepController } from '../../controllers/resources/testPreps'
import { isAdmin } from '@application/middlewares/isAdmin'

export const testPrepsRoutes: Route[] = [
	{
		path: '/resources/testPreps',
		method: 'get',
		controllers: [
			makeController(async (req) => {
				return {
					status: StatusCodes.Ok,
					result: await TestPrepController.GetTestPreps(req)
				}
			})
		]
	},
	{
		path: '/resources/testPreps/:id',
		method: 'get',
		controllers: [
			makeController(async (req) => {
				return {
					status: StatusCodes.Ok,
					result: await TestPrepController.FindTestPrep(req)
				}
			})
		]
	},
	{
		path: '/resources/testPreps',
		method: 'post',
		controllers: [
			requireAuthUser,
			isAdmin,
			makeController(async (req) => {
				return {
					status: StatusCodes.Ok,
					result: await TestPrepController.CreateTestPrep(req)
				}
			})
		]
	},
	{
		path: '/resources/testPreps/:id',
		method: 'put',
		controllers: [
			requireAuthUser,
			isAdmin,
			makeController(async (req) => {
				return {
					status: StatusCodes.Ok,
					result: await TestPrepController.UpdateTestPrep(req)
				}
			})
		]
	},
	{
		path: '/resources/testPreps/:id',
		method: 'delete',
		controllers: [
			requireAuthUser,
			isAdmin,
			makeController(async (req) => {
				return {
					status: StatusCodes.Ok,
					result: await TestPrepController.DeleteTestPrep(req)
				}
			})
		]
	}
]