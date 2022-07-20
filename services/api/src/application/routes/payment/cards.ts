import { makeController, Route, StatusCodes } from '@utils/commons'
import { CardsController } from '@application/controllers/payment/cards'

export const cardsRoutes: Route[] = [
	{
		path: '/payment/cards',
		method: 'get',
		controllers: [
			makeController(async (req) => {
				return {
					status: StatusCodes.Ok,
					result: await CardsController.get(req)
				}
			})
		]
	},
	{
		path: '/payment/cards/:id',
		method: 'get',
		controllers: [
			makeController(async (req) => {
				return {
					status: StatusCodes.Ok,
					result: await CardsController.find(req)
				}
			})
		]
	},
	{
		path: '/payment/cards/:id/primary',
		method: 'put',
		controllers: [
			makeController(async (req) => {
				return {
					status: StatusCodes.Ok,
					result: await CardsController.makePrimary(req)
				}
			})
		]
	},
	{
		path: '/payment/cards/:id',
		method: 'delete',
		controllers: [
			makeController(async (req) => {
				return {
					status: StatusCodes.Ok,
					result: await CardsController.delete(req)
				}
			})
		]
	}
]