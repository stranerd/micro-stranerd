import { makeController, requireAuthUser, Route, StatusCodes } from '@utils/commons'
import { AnswerCommentController } from '../../controllers/questions/answerComments'

export const answerCommentsRoutes: Route[] = [
	{
		path: '/answerComments',
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
		path: '/answerComments/:id',
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
		path: '/answerComments',
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