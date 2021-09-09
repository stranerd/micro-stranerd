import { mongoose } from '@utils/commons'
import { IPaymentRepository } from '@modules/payments/domain/i-repositories/payment'
import { PaymentMapper } from '../mappers/answers'
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
		if (!mongoose.Types.ObjectId.isValid(data.id)) return null
		if (!mongoose.Types.ObjectId.isValid(data.userId)) return null
		const payment = await Payment.findOne({ _id: data.id, userId: data.userId })
		return this.mapper.mapFrom(payment)
	}

	async makeAsComplete (id: string) {
		if (!mongoose.Types.ObjectId.isValid(id)) return null
		const payment = await Payment.findOneAndUpdate({ _id: id },{isCompleted: true},{new: true})
		return payment ? true : false
	}

	async create (data: PaymentToModel) {
		const payment = await new Payment(data).save()
		return this.mapper.mapFrom(payment)!
	}
}