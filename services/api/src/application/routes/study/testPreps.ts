import { makeController, requireAuthUser, Route, StatusCodes } from '@utils/commons'
import { TestPrepController } from '../../controllers/study/testPreps'
import { isAdmin } from '@application/middlewares/isAdmin'

export const testPrepsRoutes: Route[] = [
	{
		path: '/study/testPreps',
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
		path: '/study/testPreps/:id',
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
		path: '/study/testPreps',
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
		path: '/study/testPreps/:id',
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
		path: '/study/testPreps/:id',
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