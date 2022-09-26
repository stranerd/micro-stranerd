import { makeController, Route, StatusCodes } from '@utils/app/package'
import { PastQuestionController } from '../../controllers/school/pastQuestions'
import { isAdmin, isAuthenticated } from '@application/middlewares'

export const pastQuestionsRoutes: Route[] = [
	{
		path: '/school/pastQuestions',
		method: 'get',
		controllers: [
			makeController(async (req) => {
				return {
					status: StatusCodes.Ok,
					result: await PastQuestionController.GetPastQuestion(req)
				}
			})
		]
	},
	{
		path: '/school/pastQuestions/:id',
		method: 'get',
		controllers: [
			makeController(async (req) => {
				return {
					status: StatusCodes.Ok,
					result: await PastQuestionController.FindPastQuestion(req)
				}
			})
		]
	},
	{
		path: '/school/pastQuestions/',
		method: 'post',
		controllers: [
			isAuthenticated, isAdmin,
			makeController(async (req) => {
				return {
					status: StatusCodes.Ok,
					result: await PastQuestionController.CreatePastQuestion(req)
				}
			})
		]
	},
	{
		path: '/school/pastQuestions/:id',
		method: 'put',
		controllers: [
			isAuthenticated, isAdmin,
			makeController(async (req) => {
				return {
					status: StatusCodes.Ok,
					result: await PastQuestionController.UpdatePastQuestion(req)
				}
			})
		]
	},
	{
		path: '/school/pastQuestions/:id',
		method: 'delete',
		controllers: [
			isAuthenticated, isAdmin,
			makeController(async (req) => {
				return {
					status: StatusCodes.Ok,
					result: await PastQuestionController.DeletePastQuestion(req)
				}
			})
		]
	}
]