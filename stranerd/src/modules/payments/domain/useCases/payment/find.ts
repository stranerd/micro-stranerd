import { BaseUseCase } from '@utils/commons'
import { PaymentEntity } from '../../entities/payment'
import { IPaymentRepository } from '../../i-repositories/payment'

type Input = { userId: string, id: string }

export class FindPaymentUseCase implements BaseUseCase<Input, PaymentEntity | null> {
	repository: IPaymentRepository

	constructor (repo: IPaymentRepository) {
		this.repository = repo
	}

	async execute (input: Input) {
		return await this.repository.find(input)
	}
}