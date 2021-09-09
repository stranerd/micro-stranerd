import { BaseUseCase } from '@utils/commons'
import { IPaymentRepository } from '../../i-repositories/payment'

type Input = {
	intent: string,
	userId: string
}

export class MarkAsCompleteUseCase implements BaseUseCase<Input, boolean> {
	repository: IPaymentRepository

	constructor (repo: IPaymentRepository) {
		this.repository = repo
	}

	async execute (input: Input) {
		return await this.repository.markAsComplete(input.intent, input.userId)
	}
}