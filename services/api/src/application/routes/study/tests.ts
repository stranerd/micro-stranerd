import { makeController, Route, StatusCodes } from '@utils/app/package'
import { TestController } from '../../controllers/study/tests'
import { isAuthenticated } from '@application/middlewares'

export const testsRoutes: Route[] = [
	{
		path: '/study/tests',
		method: 'get',
		controllers: [
			isAuthenticated,
			makeController(async (req) => {
				return {
					status: StatusCodes.Ok,
					result: await TestController.GetTests(req)
				}
			})
		]
	},
	{
		path: '/study/tests/:id',
		method: 'get',
		controllers: [
			isAuthenticated,
			makeController(async (req) => {
				return {
					status: StatusCodes.Ok,
					result: await TestController.FindTest(req)
				}
			})
		]
	},
	{
		path: '/study/tests',
		method: 'post',
		controllers: [
			isAuthenticated,
			makeController(async (req) => {
				return {
					status: StatusCodes.Ok,
					result: await TestController.CreateTest(req)
				}
			})
		]
	},
	{
		path: '/study/tests/:id/answer',
		method: 'put',
		controllers: [
			isAuthenticated,
			makeController(async (req) => {
				return {
					status: StatusCodes.Ok,
					result: await TestController.UpdateAnswer(req)
				}
			})
		]
	},
	{
		path: '/study/tests/:id/end',
		method: 'put',
		controllers: [
			isAuthenticated,
			makeController(async (req) => {
				return {
					status: StatusCodes.Ok,
					result: await TestController.MarkTestDone(req)
				}
			})
		]
	}
]