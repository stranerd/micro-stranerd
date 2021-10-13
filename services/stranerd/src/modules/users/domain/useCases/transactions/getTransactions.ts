import { BaseUseCase, QueryParams, QueryResults } from '@utils/commons'
import { TransactionEntity } from '../../entities/transactions'
import { ITransactionRepository } from '../../i-repositories/transactions'

export class GetTransactionsUseCase implements BaseUseCase<QueryParams, QueryResults<TransactionEntity>> {
	repository: ITransactionRepository

	constructor (repo: ITransactionRepository) {
		this.repository = repo
	}

	async execute (input: QueryParams) {
		return await this.repository.getTransactions(input)
	}
}