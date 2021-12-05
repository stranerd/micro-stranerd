import { makeController, requireAuthUser, Route, StatusCodes } from '@utils/commons'
import { CommentController } from '../../controllers/study/comments'

export const commentsRoutes: Route[] = [
	{
		path: '/study/comments',
		method: 'get',
		controllers: [
			makeController(async (req) => {
				return {
					status: StatusCodes.Ok,
					result: await CommentController.GetComments(req)
				}
			})
		]
	},
	{
		path: '/study/comments/:id',
		method: 'get',
		controllers: [
			makeController(async (req) => {
				return {
					status: StatusCodes.Ok,
					result: await CommentController.FindComment(req)
				}
			})
		]
	},
	{
		path: '/study/comments',
		method: 'post',
		controllers: [
			requireAuthUser,
			makeController(async (req) => {
				return {
					status: StatusCodes.Ok,
					result: await CommentController.CreateComment(req)
				}
			})
		]
	}
]