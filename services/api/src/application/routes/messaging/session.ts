import { makeController, requireAuthUser, Route, StatusCodes } from '@utils/commons'
import { SessionController } from '../../controllers/messaging'

export const sessionRoutes: Route[] = [
	{
		path: '/messaging/sessions',
		method: 'get',
		controllers: [
			requireAuthUser,
			makeController(async (req) => {
				return {
					status: StatusCodes.Ok,
					result: await SessionController.getSessions(req)
				}
			})
		]
	},
	{
		path: '/messaging/sessions/:id',
		method: 'get',
		controllers: [
			requireAuthUser,
			makeController(async (req) => {
				return {
					status: StatusCodes.Ok,
					result: await SessionController.findSession(req)
				}
			})
		]
	},
	{
		path: '/messaging/sessions',
		method: 'post',
		controllers: [
			requireAuthUser,
			makeController(async (req) => {
				return {
					status: StatusCodes.Ok,
					result: await SessionController.addSession(req)
				}
			})
		]
	},
	{
		path: '/messaging/sessions/:id/accept',
		method: 'put',
		controllers: [
			requireAuthUser,
			makeController(async (req) => {
				return {
					status: StatusCodes.Ok,
					result: await SessionController.acceptSession(req)
				}
			})
		]
	},
	{
		path: '/messaging/sessions/:id/cancel',
		method: 'put',
		controllers: [
			requireAuthUser,
			makeController(async (req) => {
				return {
					status: StatusCodes.Ok,
					result: await SessionController.cancelSession(req)
				}
			})
		]
	},
	{
		path: '/messaging/sessions/:id/end',
		method: 'put',
		controllers: [
			requireAuthUser,
			makeController(async (req) => {
				return {
					status: StatusCodes.Ok,
					result: await SessionController.endSession(req)
				}
			})
		]
	}
]