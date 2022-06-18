import { makeController, requireAuthUser, Route, StatusCodes } from '@utils/commons'
import { LikesController } from '../../controllers/interactions/likes'

export const likesRoutes: Route[] = [
	{
		path: '/interactions/likes/',
		method: 'get',
		controllers: [
			makeController(async (req) => {
				return {
					status: StatusCodes.Ok,
					result: await LikesController.getLikes(req)
				}
			})
		]
	},
	{
		path: '/interactions/likes/:id',
		method: 'get',
		controllers: [
			makeController(async (req) => {
				return {
					status: StatusCodes.Ok,
					result: await LikesController.findLike(req)
				}
			})
		]
	},
	{
		path: '/interactions/likes/',
		method: 'post',
		controllers: [
			requireAuthUser,
			makeController(async (req) => {
				return {
					status: StatusCodes.Ok,
					result: await LikesController.createLike(req)
				}
			})
		]
	}
]