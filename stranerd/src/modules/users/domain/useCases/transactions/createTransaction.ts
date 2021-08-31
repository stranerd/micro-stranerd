import { BaseUseCase } from '@utils/commons'
import { ITransactionRepository } from '../../i-repositories/transactions'
import { TransactionToModel } from '../../../data/models/transactions'
import { TransactionEntity } from '../../entities/transactions'

export class CreateTransactionUseCase implements BaseUseCase<TransactionToModel, TransactionEntity> {
	repository: ITransactionRepository

	constructor (repo: ITransactionRepository) {
		this.repository = repo
	}

	async execute (input: TransactionToModel) {
		return await this.repository.createTransaction(input)
	}
}