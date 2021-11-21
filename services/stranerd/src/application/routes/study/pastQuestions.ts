import { makeController, requireAuthUser, Route, StatusCodes } from '@utils/commons'
import { PastQuestionController } from '../../controllers/study/pastQuestions'
import { isAdmin } from '@application/middlewares/isAdmin'

export const pastQuestionsRoutes: Route[] = [
	{
		path: '/study/pastQuestions',
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
		path: '/study/pastQuestions/:id',
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
		path: '/study/pastQuestions/',
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
		path: '/study/pastQuestions/:id',
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
		path: '/study/pastQuestions/:id',
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