import { makeController, requireAuthUser, Route, StatusCodes } from '@utils/commons'
import { TransactionsController } from '../../controllers/users/transactions'

export const transactionsRoutes: Route[] = [
	{
		path: '/users/transactions/',
		method: 'get',
		controllers: [
			requireAuthUser,
			makeController(async (req) => {
				return {
					status: StatusCodes.Ok,
					result: await TransactionsController.getTransactions(req)
				}
			})
		]
	},
	{
		path: '/users/transactions/:id',
		method: 'get',
		controllers: [
			requireAuthUser,
			makeController(async (req) => {
				return {
					status: StatusCodes.Ok,
					result: await TransactionsController.findTransaction(req)
				}
			})
		]
	}
]