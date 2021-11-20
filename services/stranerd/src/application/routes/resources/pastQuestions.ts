import { makeController, requireAuthUser, Route, StatusCodes } from '@utils/commons'
import { PastQuestionController } from '../../controllers/resources/pastQuestions'
import { isAdmin } from '@application/middlewares/isAdmin'

export const pastQuestionsRoutes: Route[] = [
	{
		path: '/resources/pastQuestions',
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
		path: '/resources/pastQuestions/:id',
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
		path: '/resources/pastQuestions/',
		method: 'post',
		controllers: [
			requireAuthUser,
			isAdmin,
			makeController(async (req) => {
				return {
					status: StatusCodes.Ok,
					result: await PastQuestionController.CreatePastQuestion(req)
				}
			})
		]
	},
	{
		path: '/resources/pastQuestions/:id',
		method: 'put',
		controllers: [
			requireAuthUser,
			isAdmin,
			makeController(async (req) => {
				return {
					status: StatusCodes.Ok,
					result: await PastQuestionController.UpdatePastQuestion(req)
				}
			})
		]
	},
	{
		path: '/resources/pastQuestions/:id',
		method: 'delete',
		controllers: [
			requireAuthUser,
			isAdmin,
			makeController(async (req) => {
				return {
					status: StatusCodes.Ok,
					result: await PastQuestionController.DeletePastQuestion(req)
				}
			})
		]
	}
]