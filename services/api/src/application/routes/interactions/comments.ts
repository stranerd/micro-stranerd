import { makeController, Route, StatusCodes } from '@utils/app/package'
import { CommentsController } from '../../controllers/interactions/comments'
import { isAuthenticated } from '@application/middlewares'

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
			isAuthenticated,
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
			isAuthenticated,
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
			isAuthenticated,
			makeController(async (req) => {
				return {
					status: StatusCodes.Ok,
					result: await CommentsController.deleteComment(req)
				}
			})
		]
	}
]