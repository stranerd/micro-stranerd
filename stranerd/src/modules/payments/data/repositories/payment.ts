import { IPaymentRepository } from '../../domain/i-repositories/payment'
import { PaymentMapper } from '../mappers/payment'
import { Payment } from '../mongooseModels/payment'
import { PaymentToModel } from '../models/payment'

export class PaymentRepository implements IPaymentRepository {
	private static instance: PaymentRepository
	private mapper = new PaymentMapper()

	static getInstance (): PaymentRepository {
		if (!PaymentRepository.instance) PaymentRepository.instance = new PaymentRepository()
		return PaymentRepository.instance
	}

	async find (data: { userId: string, id: string }) {
		const payment = await Payment.findOne({ _id: data.id, userId: data.userId })
		return this.mapper.mapFrom(payment)
	}

	async markAsComplete (intent: string, userId: string) {
		const payment = await Payment.findOneAndUpdate({ intent, userId }, { isCompleted: true })
		return !!payment
	}

	async create (data: PaymentToModel) {
		const payment = await new Payment(data).save()
		return this.mapper.mapFrom(payment)!
	}
}