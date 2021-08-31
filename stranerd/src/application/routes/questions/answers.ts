import { makeController, requireAuthUser, Route, StatusCodes } from '@utils/commons'
import { AnswerController } from '../../controllers/questions'

export const answersRoutes: Route[] = [
	{
		path: '/answers',
		method: 'get',
		controllers: [
			makeController(async (req) => {
				return {
					status: StatusCodes.Ok,
					result: await AnswerController.GetAnswers(req)
				}
			})
		]
	},
	{
		path: '/answers/:id',
		method: 'get',
		controllers: [
			makeController(async (req) => {
				return {
					status: StatusCodes.Ok,
					result: await AnswerController.FindAnswer(req)
				}
			})
		]
	},
	{
		path: '/answers/:id',
		method: 'put',
		controllers: [
			requireAuthUser,
			makeController(async (req) => {
				return {
					status: StatusCodes.Ok,
					result: await AnswerController.UpdateAnswer(req)
				}
			})
		]
	},
	{
		path: '/answers',
		method: 'post',
		controllers: [
			requireAuthUser,
			makeController(async (req) => {
				return {
					status: StatusCodes.Ok,
					result: await AnswerController.CreateAnswer(req)
				}
			})
		]
	},
	{
		path: '/answers/:id',
		method: 'delete',
		controllers: [
			requireAuthUser,
			makeController(async (req) => {
				return {
					status: StatusCodes.Ok,
					result: await AnswerController.DeleteAnswer(req)
				}
			})
		]
	},
	{
		path: '/answers/:id/comment_count',
		method: 'put',
		controllers: [
			requireAuthUser,
			makeController(async (req) => {
				return {
					status: StatusCodes.Ok,
					result: await AnswerController.ModifyCommentCount(req)
				}
			})
		]
	},
	{
		path: '/answers/user_bio',
		method: 'put',
		controllers: [
			requireAuthUser,
			makeController(async (req) => {
				return {
					status: StatusCodes.Ok,
					result: await AnswerController.UpdateUserBio(req)
				}
			})
		]
	},
	{
		path: '/answers/:questionId/question',
		method: 'delete',
		controllers: [
			requireAuthUser,
			makeController(async (req) => {
				return {
					status: StatusCodes.Ok,
					result: await AnswerController.DeleteQuestionAnswers(req)
				}
			})
		]
	},
]