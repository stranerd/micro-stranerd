import { makeController, requireAuthUser, Route, StatusCodes } from '@utils/commons'
import { WalletsController } from '@application/controllers/payment/wallets'

export const walletsRoutes: Route[] = [
	{
		path: '/payment/wallets',
		method: 'get',
		controllers: [
			requireAuthUser,
			makeController(async (req) => {
				return {
					status: StatusCodes.Ok,
					result: await WalletsController.get(req)
				}
			})
		]
	}
]