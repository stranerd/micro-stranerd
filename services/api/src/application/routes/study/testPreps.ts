import { makeController, Route, StatusCodes } from '@utils/app/package'
import { TestPrepController } from '../../controllers/study/testPreps'
import { isAdmin, isAuthenticated } from '@application/middlewares'

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
			isAuthenticated,
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
			isAuthenticated,
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
			isAuthenticated,
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