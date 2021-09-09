import { BaseUseCase } from '@utils/commons'
import { IPaymentRepository } from '../../i-repositories/payment'

export class MarkAsCompleteUseCase implements BaseUseCase<string, boolean | null> {
	repository: IPaymentRepository

	constructor (repo: IPaymentRepository) {
		this.repository = repo
	}

	async execute (id: string) {
		return await this.repository.makeAsComplete(id)
	}
}