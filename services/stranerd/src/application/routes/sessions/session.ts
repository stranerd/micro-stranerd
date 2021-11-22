import { makeController, requireAuthUser, Route, StatusCodes } from '@utils/commons'
import { SessionController } from '../../controllers/sessions'

export const sessionRoutes: Route[] = [
	{
		path: '/sessions/sessions',
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
		path: '/sessions/sessions/:id',
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
		path: '/sessions/sessions',
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
		path: '/sessions/sessions/:id/accept',
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
		path: '/sessions/sessions/:id/cancel',
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
		path: '/sessions/sessions/:id/end',
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