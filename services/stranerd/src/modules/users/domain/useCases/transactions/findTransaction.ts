import { BaseUseCase } from '@utils/commons'
import { TransactionEntity } from '../../entities/transactions'
import { ITransactionRepository } from '../../i-repositories/transactions'

type Input = { userId: string, id: string }

export class FindTransactionUseCase implements BaseUseCase<Input, TransactionEntity | null> {
	repository: ITransactionRepository

	constructor (repo: ITransactionRepository) {
		this.repository = repo
	}

	async execute (input: Input) {
		return await this.repository.findTransaction(input)
	}
}