import { makeController, requireAuthUser, Route, StatusCodes } from '@utils/commons'
import { AnswerCommentController } from '../../controllers/questions'

export const answerCommentsRoutes: Route[] = [
	{
		path: '/comments',
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
		path: '/comments/:id',
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
		path: '/comments',
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