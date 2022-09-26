import { makeController, Route, StatusCodes } from '@utils/app/package'
import { AnswerController } from '../../controllers/questions/answers'
import { isAuthenticated, isSubscribed } from '@application/middlewares'

export const answersRoutes: Route[] = [
	{
		path: '/questions/answers',
		method: 'get',
		controllers: [
			isSubscribed,
			makeController(async (req) => {
				return {
					status: StatusCodes.Ok,
					result: await AnswerController.GetAnswers(req)
				}
			})
		]
	},
	{
		path: '/questions/answers/:id',
		method: 'get',
		controllers: [
			isSubscribed,
			makeController(async (req) => {
				return {
					status: StatusCodes.Ok,
					result: await AnswerController.FindAnswer(req)
				}
			})
		]
	},
	{
		path: '/questions/answers/:id',
		method: 'put',
		controllers: [
			isAuthenticated,
			makeController(async (req) => {
				return {
					status: StatusCodes.Ok,
					result: await AnswerController.UpdateAnswer(req)
				}
			})
		]
	},
	{
		path: '/questions/answers',
		method: 'post',
		controllers: [
			isAuthenticated, isSubscribed,
			makeController(async (req) => {
				return {
					status: StatusCodes.Ok,
					result: await AnswerController.CreateAnswer(req)
				}
			})
		]
	},
	{
		path: '/questions/answers/:id',
		method: 'delete',
		controllers: [
			isAuthenticated,
			makeController(async (req) => {
				return {
					status: StatusCodes.Ok,
					result: await AnswerController.DeleteAnswer(req)
				}
			})
		]
	}
]