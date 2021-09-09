import { BaseUseCase } from '@utils/commons'
import { PaymentToModel } from '@modules/payments/data/models/payment'
import { PaymentEntity } from '../../entities/payment'
import { IPaymentRepository } from '../../i-repositories/payment'

export class CreatePaymentUseCase implements BaseUseCase<PaymentToModel, PaymentEntity> {
	repository: IPaymentRepository

	constructor (repo: IPaymentRepository) {
		this.repository = repo
	}

	async execute (input: PaymentToModel) {
		return await this.repository.create(input)
	}
}