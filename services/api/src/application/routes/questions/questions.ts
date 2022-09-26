import { makeController, Route, StatusCodes } from '@utils/app/package'
import { QuestionController } from '../../controllers/questions/questions'
import { isAuthenticated } from '@application/middlewares'

export const questionsRoutes: Route[] = [
	{
		path: '/questions/questions',
		method: 'get',
		controllers: [
			makeController(async (req) => {
				return {
					status: StatusCodes.Ok,
					result: await QuestionController.GetQuestion(req)
				}
			})
		]
	},
	{
		path: '/questions/questions/:id',
		method: 'get',
		controllers: [
			makeController(async (req) => {
				return {
					status: StatusCodes.Ok,
					result: await QuestionController.FindQuestion(req)
				}
			})
		]
	},
	{
		path: '/questions/questions/:id',
		method: 'put',
		controllers: [
			isAuthenticated,
			makeController(async (req) => {
				return {
					status: StatusCodes.Ok,
					result: await QuestionController.UpdateQuestion(req)
				}
			})
		]
	},
	{
		path: '/questions/questions',
		method: 'post',
		controllers: [
			isAuthenticated,
			makeController(async (req) => {
				return {
					status: StatusCodes.Ok,
					result: await QuestionController.CreateQuestion(req)
				}
			})
		]
	},
	{
		path: '/questions/questions/:id',
		method: 'delete',
		controllers: [
			isAuthenticated,
			makeController(async (req) => {
				return {
					status: StatusCodes.Ok,
					result: await QuestionController.DeleteQuestion(req)
				}
			})
		]
	},
	{
		path: '/questions/questions/:id/best',
		method: 'put',
		controllers: [
			isAuthenticated,
			makeController(async (req) => {
				return {
					status: StatusCodes.Ok,
					result: await QuestionController.MarkBestAnswer(req)
				}
			})
		]
	}
]