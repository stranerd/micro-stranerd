import { makeController, requireAuthUser, Route, StatusCodes } from '@utils/commons'
import { TestController } from '../../controllers/study/tests'

export const testsRoutes: Route[] = [
	{
		path: '/study/tests',
		method: 'get',
		controllers: [
			requireAuthUser,
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
			requireAuthUser,
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
			requireAuthUser,
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
			requireAuthUser,
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
			requireAuthUser,
			makeController(async (req) => {
				return {
					status: StatusCodes.Ok,
					result: await TestController.MarkTestDone(req)
				}
			})
		]
	}
]