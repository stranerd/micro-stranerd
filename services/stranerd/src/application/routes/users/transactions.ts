import { makeController, requireAuthUser, Route, StatusCodes } from '@utils/commons'
import { TransactionsController } from '../../controllers/users/transactions'

export const transactionsRoutes: Route[] = [
	{
		path: '/transactions/',
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
		path: '/transactions/:id',
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