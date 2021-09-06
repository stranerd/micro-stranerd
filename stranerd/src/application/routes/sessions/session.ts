import { makeController, requireAuthUser, Route, StatusCodes } from '@utils/commons'
import { SessionController } from '../../controllers/sessions'

export const SessionRoutes: Route[] = [
	{
		path: '/sessions',
		method: 'get',
		controllers: [
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
			makeController(async (req) => {
				return {
					status: StatusCodes.Ok,
					result: await SessionController.getSession(req)
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
		path: '/sessions/accept',
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
		path: '/sessions/cancle',
		method: 'put',
		controllers: [
			requireAuthUser,
			makeController(async (req) => {
				return {
					status: StatusCodes.Ok,
					result: await SessionController.cancleSession(req)
				}
			})
		]
	}
]