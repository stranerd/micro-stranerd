import { BaseUseCase } from '@utils/commons'
import { ITransactionRepository } from '../../i-repositories/transactions'

export class MarkAsCompleteUseCase implements BaseUseCase<string, boolean | null> {
	repository: ITransactionRepository

	constructor (repo: ITransactionRepository) {
		this.repository = repo
	}

	async execute (id: string) {
		return await this.repository.makeAsComplete(id)
	}
}