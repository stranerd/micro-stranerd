import { makeController, requireAuthUser, Route, StatusCodes } from '@utils/commons'
import { QuestionController } from '../../controllers/questions/questions'

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
			requireAuthUser,
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
			requireAuthUser,
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
			requireAuthUser,
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
			requireAuthUser,
			makeController(async (req) => {
				return {
					status: StatusCodes.Ok,
					result: await QuestionController.MarkBestAnswer(req)
				}
			})
		]
	}
]