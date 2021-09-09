import { makeController, requireAuthUser, Route, StatusCodes } from '@utils/commons'
import { StripeController } from '../../controllers/payments/stripe'

export const stripeRoutes: Route[] = [
	{
		path: '/payment/stripe/coins',
		method: 'post',
		controllers: [
			requireAuthUser,
			makeController(async (req) => {
				return {
					status: StatusCodes.Ok,
					result: await StripeController.buyCoins(req)
				}
			})
		]
	},
	{
		path: '/payment/stripe/verify',
		method: 'post',
		controllers: [
			requireAuthUser,
			makeController(async (req) => {
				return {
					status: StatusCodes.Ok,
					result: await StripeController.verifyPayment(req)
				}
			})
		]
	}
]