import { FindTransaction, GetTransactions } from '@modules/users'
import { Conditions, QueryParams, Request } from '@utils/commons'

export class TransactionsController {
	static async getTransactions (req: Request) {
		const query = req.body as QueryParams
		query.whereType = 'and'
		if (!query.where) query.where = []
		const ofUser = query.where.find((q) => q.field === 'userId')
		if (ofUser) {
			ofUser.condition = Conditions.eq
			ofUser.value = req.authUser!.id
		} else query.where.push({
			field: 'userId', condition: Conditions.eq, value: req.authUser!.id
		})
		return await GetTransactions.execute(query)
	}

	static async findTransaction (req: Request) {
		return await FindTransaction.execute({
			id: req.params.id,
			userId: req.authUser!.id
		})
	}
}