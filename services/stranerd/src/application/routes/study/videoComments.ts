import { makeController, requireAuthUser, Route, StatusCodes } from '@utils/commons'
import { VideoCommentController } from '../../controllers/study/videoComments'

export const videoCommentsRoutes: Route[] = [
	{
		path: '/study/videoComments',
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
		path: '/study/videoComments/:id',
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
		path: '/study/videoComments',
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