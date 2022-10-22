import { makeController, Route, StatusCodes } from '@utils/app/package'
import { PostController } from '../../controllers/teachers/posts'
import { isAuthenticated } from '@application/middlewares'

export const postsRoutes: Route[] = [
	{
		path: '/teachers/:courseId/posts',
		method: 'get',
		controllers: [
			makeController(async (req) => {
				return {
					status: StatusCodes.Ok,
					result: await PostController.GetPost(req)
				}
			})
		]
	},
	{
		path: '/teachers/:courseId/posts/:id',
		method: 'get',
		controllers: [
			makeController(async (req) => {
				return {
					status: StatusCodes.Ok,
					result: await PostController.FindPost(req)
				}
			})
		]
	},
	{
		path: '/teachers/:courseId/posts',
		method: 'post',
		controllers: [
			isAuthenticated,
			makeController(async (req) => {
				return {
					status: StatusCodes.Ok,
					result: await PostController.CreatePost(req)
				}
			})
		]
	},
	{
		path: '/teachers/:courseId/posts/:id',
		method: 'delete',
		controllers: [
			isAuthenticated,
			makeController(async (req) => {
				return {
					status: StatusCodes.Ok,
					result: await PostController.DeletePost(req)
				}
			})
		]
	}
]