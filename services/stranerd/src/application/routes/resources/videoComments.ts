import { makeController, requireAuthUser, Route, StatusCodes } from '@utils/commons'
import { VideoCommentController } from '../../controllers/resources/videoComments'

export const videoCommentsRoutes: Route[] = [
	{
		path: '/resources/videoComments',
		method: 'get',
		controllers: [
			makeController(async (req) => {
				return {
					status: StatusCodes.Ok,
					result: await VideoCommentController.GetVideoComments(req)
				}
			})
		]
	},
	{
		path: '/resources/videoComments/:id',
		method: 'get',
		controllers: [
			makeController(async (req) => {
				return {
					status: StatusCodes.Ok,
					result: await VideoCommentController.FindVideoComment(req)
				}
			})
		]
	},
	{
		path: '/resources/videoComments',
		method: 'post',
		controllers: [
			requireAuthUser,
			makeController(async (req) => {
				return {
					status: StatusCodes.Ok,
					result: await VideoCommentController.CreateVideoComment(req)
				}
			})
		]
	}
]