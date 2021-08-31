import { makeController, requireAuthUser, Route, StatusCodes } from '@utils/commons'
import { QuestionController } from '../../controllers/questions'

export const questionsRoutes: Route[] = [
	{
		path: '/questions',
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
		path: '/questions/:id',
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
		path: '/questions/:id',
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
		path: '/questions',
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
		path: '/questions/:id',
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
		path: '/questions/:id/best',
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
	},
	{
		path: '/questions/:id/answer_count',
		method: 'put',
		controllers: [
			requireAuthUser,
			makeController(async (req) => {
				return {
					status: StatusCodes.Ok,
					result: await QuestionController.ModifyAnswerCount(req)
				}
			})
		]
	},
	{
		path: '/questions/:id/remove_best',
		method: 'put',
		controllers: [
			requireAuthUser,
			makeController(async (req) => {
				return {
					status: StatusCodes.Ok,
					result: await QuestionController.RemoveBestAnswer(req)
				}
			})
		]
	},
	{
		path: '/questions/:id/user_bio',
		method: 'put',
		controllers: [
			requireAuthUser,
			makeController(async (req) => {
				return {
					status: StatusCodes.Ok,
					result: await QuestionController.UpdateQuestionUserBio(req)
				}
			})
		]
	},
]