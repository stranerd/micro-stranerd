import { makeController, requireAuthUser, Route, StatusCodes } from '@utils/commons'
import { CommentsController } from '../../controllers/interactions/comments'

export const commentsRoutes: Route[] = [
	{
		path: '/interactions/comments/',
		method: 'get',
		controllers: [
			makeController(async (req) => {
				return {
					status: StatusCodes.Ok,
					result: await CommentsController.getComments(req)
				}
			})
		]
	},
	{
		path: '/interactions/comments/:id',
		method: 'get',
		controllers: [
			makeController(async (req) => {
				return {
					status: StatusCodes.Ok,
					result: await CommentsController.findComment(req)
				}
			})
		]
	},
	{
		path: '/interactions/comments/',
		method: 'post',
		controllers: [
			requireAuthUser,
			makeController(async (req) => {
				return {
					status: StatusCodes.Ok,
					result: await CommentsController.createComment(req)
				}
			})
		]
	},
	{
		path: '/interactions/comments/:id',
		method: 'put',
		controllers: [
			requireAuthUser,
			makeController(async (req) => {
				return {
					status: StatusCodes.Ok,
					result: await CommentsController.updateComment(req)
				}
			})
		]
	},
	{
		path: '/interactions/comments/:id',
		method: 'delete',
		controllers: [
			requireAuthUser,
			makeController(async (req) => {
				return {
					status: StatusCodes.Ok,
					result: await CommentsController.deleteComment(req)
				}
			})
		]
	}
]