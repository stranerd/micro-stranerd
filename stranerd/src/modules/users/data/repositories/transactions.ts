import { ITransactionRepository } from '../../domain/i-repositories/transactions'
import { TransactionMapper } from '../mappers/transactions'
import { Transaction } from '../mongooseModels/transactions'
import { parseQueryParams, QueryParams } from '@utils/commons'
import { TransactionFromModel, TransactionToModel } from '../models/transactions'

export class TransactionRepository implements ITransactionRepository {
	private static instance: TransactionRepository
	private mapper = new TransactionMapper()

	static getInstance (): TransactionRepository {
		if (!TransactionRepository.instance) TransactionRepository.instance = new TransactionRepository()
		return TransactionRepository.instance
	}

	async getTransactions (query: QueryParams) {
		const data = await parseQueryParams<TransactionFromModel>(Transaction, query)
		return {
			...data,
			results: data.results.map((n) => this.mapper.mapFrom(n)!)
		}
	}

	async findTransaction (data: { userId: string, id: string }) {
		const transaction = await Transaction.findOne({ _id: data.id, userId: data.userId })
		return this.mapper.mapFrom(transaction)
	}

	async createTransaction (data: TransactionToModel) {
		const transaction = await new Transaction(data).save()
		return this.mapper.mapFrom(transaction)!
	}
}