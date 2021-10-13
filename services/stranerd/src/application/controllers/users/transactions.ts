import { FindTransaction, GetTransactions } from '@modules/users'
import { QueryParams, Request } from '@utils/commons'

export class TransactionsController {
	static async getTransactions (req: Request) {
		const query = req.query as QueryParams
		query.auth = [{ field: 'userId', value: req.authUser!.id }]
		return await GetTransactions.execute(query)
	}

	static async findTransaction (req: Request) {
		return await FindTransaction.execute({
			id: req.params.id,
			userId: req.authUser!.id
		})
	}
}