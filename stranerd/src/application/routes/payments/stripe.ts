import { makeController, requireAuthUser, Route, StatusCodes } from '@utils/commons'
import { StripeController } from '../../controllers/payments/stripe'

export const stripeRoutes: Route[] = [
	{
		path: '/payment/stripe',
		method: 'post',
		controllers: [
			requireAuthUser,
			makeController(async (req) => {
				return {
					status: StatusCodes.Ok,
					result: await StripeController.makeIntent(req)
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