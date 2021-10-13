import { makeController, requireAuthUser, Route, StatusCodes } from '@utils/commons'
import { AnswerCommentController } from '../../controllers/questions'

export const answerCommentsRoutes: Route[] = [
	{
		path: '/questions/answerComments',
		method: 'get',
		controllers: [
			makeController(async (req) => {
				return {
					status: StatusCodes.Ok,
					result: await AnswerCommentController.GetAnswerComments(req)
				}
			})
		]
	},
	{
		path: '/questions/answerComments/:id',
		method: 'get',
		controllers: [
			makeController(async (req) => {
				return {
					status: StatusCodes.Ok,
					result: await AnswerCommentController.FindAnswerComment(req)
				}
			})
		]
	},
	{
		path: '/questions/answerComments',
		method: 'post',
		controllers: [
			requireAuthUser,
			makeController(async (req) => {
				return {
					status: StatusCodes.Ok,
					result: await AnswerCommentController.CreateAnswerComment(req)
				}
			})
		]
	}
]