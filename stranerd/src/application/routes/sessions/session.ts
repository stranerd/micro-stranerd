import { makeController, requireAuthUser, Route, StatusCodes } from '@utils/commons'
import { SessionController } from '../../controllers/sessions'

export const SessionRoutes: Route[] = [
	{
		path: '/sessions',
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
		path: '/sessions/:id',
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
		path: '/sessions',
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
		path: '/sessions/:id/accept',
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
		path: '/sessions/:id/cancel',
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
		path: '/sessions/:id/end',
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