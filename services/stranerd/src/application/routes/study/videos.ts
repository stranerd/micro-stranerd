import { makeController, requireAuthUser, Route, StatusCodes } from '@utils/commons'
import { VideoController } from '../../controllers/study/videos'
import { isTutor } from '@application/middlewares/isTutor'

export const videosRoutes: Route[] = [
	{
		path: '/study/videos',
		method: 'get',
		controllers: [
			makeController(async (req) => {
				return {
					status: StatusCodes.Ok,
					result: await VideoController.GetVideo(req)
				}
			})
		]
	},
	{
		path: '/study/videos/:id',
		method: 'get',
		controllers: [
			makeController(async (req) => {
				return {
					status: StatusCodes.Ok,
					result: await VideoController.FindVideo(req)
				}
			})
		]
	},
	{
		path: '/study/videos/:id',
		method: 'put',
		controllers: [
			requireAuthUser,
			isTutor,
			makeController(async (req) => {
				return {
					status: StatusCodes.Ok,
					result: await VideoController.UpdateVideo(req)
				}
			})
		]
	},
	{
		path: '/study/videos',
		method: 'post',
		controllers: [
			requireAuthUser,
			isTutor,
			makeController(async (req) => {
				return {
					status: StatusCodes.Ok,
					result: await VideoController.CreateVideo(req)
				}
			})
		]
	},
	{
		path: '/study/videos/:id',
		method: 'delete',
		controllers: [
			requireAuthUser,
			isTutor,
			makeController(async (req) => {
				return {
					status: StatusCodes.Ok,
					result: await VideoController.DeleteVideo(req)
				}
			})
		]
	}
]