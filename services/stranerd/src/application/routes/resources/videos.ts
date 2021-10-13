import { makeController, requireAuthUser, Route, StatusCodes } from '@utils/commons'
import { VideoController } from '../../controllers/resources/videos'
import { isTutor } from '@application/middlewares/isTutor'

export const videosRoutes: Route[] = [
	{
		path: '/resources/videos',
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
		path: '/resources/videos/:id',
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
		path: '/resources/videos/:id',
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
		path: '/resources/videos',
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
		path: '/resources/videos/:id',
		method: 'delete',
		controllers: [
			requireAuthUser,
			makeController(async (req) => {
				return {
					status: StatusCodes.Ok,
					result: await VideoController.DeleteVideo(req)
				}
			})
		]
	}
]