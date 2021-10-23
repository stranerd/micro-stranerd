import { makeController, requireAuthUser, Route, StatusCodes } from '@utils/commons'
import { PastQuestionController } from '../../controllers/resources/pastQuestions'
import { isAdmin } from '@application/middlewares/isAdmin'

export const pastQuestionsRoutes: Route[] = [
	{
		path: '/resources/pastQuestions/objectives',
		method: 'get',
		controllers: [
			makeController(async (req) => {
				return {
					status: StatusCodes.Ok,
					result: await PastQuestionController.GetPastObjQuestion(req)
				}
			})
		]
	},
	{
		path: '/resources/pastQuestions/theory',
		method: 'get',
		controllers: [
			makeController(async (req) => {
				return {
					status: StatusCodes.Ok,
					result: await PastQuestionController.GetPastTheoryQuestion(req)
				}
			})
		]
	},
	{
		path: '/resources/pastQuestions/objectives/:id',
		method: 'get',
		controllers: [
			makeController(async (req) => {
				return {
					status: StatusCodes.Ok,
					result: await PastQuestionController.FindPastObjQuestion(req)
				}
			})
		]
	},
	{
		path: '/resources/pastQuestions/theory/:id',
		method: 'get',
		controllers: [
			makeController(async (req) => {
				return {
					status: StatusCodes.Ok,
					result: await PastQuestionController.FindPastTheoryQuestion(req)
				}
			})
		]
	},
	{
		path: '/resources/pastQuestions/objectives',
		method: 'post',
		controllers: [
			requireAuthUser,
			isAdmin,
			makeController(async (req) => {
				return {
					status: StatusCodes.Ok,
					result: await PastQuestionController.CreatePastObjQuestion(req)
				}
			})
		]
	},
	{
		path: '/resources/pastQuestions/theory',
		method: 'post',
		controllers: [
			requireAuthUser,
			isAdmin,
			makeController(async (req) => {
				return {
					status: StatusCodes.Ok,
					result: await PastQuestionController.CreatePastTheoryQuestion(req)
				}
			})
		]
	},
	{
		path: '/resources/pastQuestions/objectives/:id',
		method: 'put',
		controllers: [
			requireAuthUser,
			isAdmin,
			makeController(async (req) => {
				return {
					status: StatusCodes.Ok,
					result: await PastQuestionController.UpdatePastObjQuestion(req)
				}
			})
		]
	},
	{
		path: '/resources/pastQuestions/theory/:id',
		method: 'put',
		controllers: [
			requireAuthUser,
			isAdmin,
			makeController(async (req) => {
				return {
					status: StatusCodes.Ok,
					result: await PastQuestionController.UpdatePastTheoryQuestion(req)
				}
			})
		]
	},
	{
		path: '/resources/pastQuestions/objectives/:id',
		method: 'delete',
		controllers: [
			requireAuthUser,
			isAdmin,
			makeController(async (req) => {
				return {
					status: StatusCodes.Ok,
					result: await PastQuestionController.DeletePastObjQuestion(req)
				}
			})
		]
	},
	{
		path: '/resources/pastQuestions/theory/:id',
		method: 'delete',
		controllers: [
			requireAuthUser,
			isAdmin,
			makeController(async (req) => {
				return {
					status: StatusCodes.Ok,
					result: await PastQuestionController.DeletePastTheoryQuestion(req)
				}
			})
		]
	}
]