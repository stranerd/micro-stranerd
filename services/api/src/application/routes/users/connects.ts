import { makeController, Route, StatusCodes } from '@utils/app/package'
import { ConnectsController } from '../../controllers/users/connects'
import { isAuthenticated, isSubscribed } from '@application/middlewares'

export const connectsRoutes: Route[] = [
	{
		path: '/users/connects/',
		method: 'get',
		controllers: [
			isAuthenticated,
			makeController(async (req) => {
				return {
					status: StatusCodes.Ok,
					result: await ConnectsController.get(req)
				}
			})
		]
	},
	{
		path: '/users/connects/:id',
		method: 'get',
		controllers: [
			isAuthenticated,
			makeController(async (req) => {
				return {
					status: StatusCodes.Ok,
					result: await ConnectsController.find(req)
				}
			})
		]
	},
	{
		path: '/users/connects/',
		method: 'post',
		controllers: [
			isAuthenticated, isSubscribed,
			makeController(async (req) => {
				return {
					status: StatusCodes.Ok,
					result: await ConnectsController.create(req)
				}
			})
		]
	},
	{
		path: '/users/connects/:id/accept',
		method: 'put',
		controllers: [
			isAuthenticated,
			makeController(async (req) => {
				return {
					status: StatusCodes.Ok,
					result: await ConnectsController.accept(req)
				}
			})
		]
	},
	{
		path: '/users/connects/:id',
		method: 'delete',
		controllers: [
			isAuthenticated,
			makeController(async (req) => {
				return {
					status: StatusCodes.Ok,
					result: await ConnectsController.delete(req)
				}
			})
		]
	}
]