import { TransactionEntity } from '../entities/transactions'
import { TransactionToModel } from '../../data/models/transactions'
import { QueryParams, QueryResults } from '@utils/commons'

export interface ITransactionRepository {
	findTransaction (data: { userId: string, id: string }): Promise<TransactionEntity | null>

	createTransaction (data: TransactionToModel): Promise<TransactionEntity>

	getTransactions (query: QueryParams): Promise<QueryResults<TransactionEntity>>

	makeAsComplete (id: string): Promise<boolean | null>
}