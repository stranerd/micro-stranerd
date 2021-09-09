import { PaymentEntity } from '../entities/payment'
import { PaymentToModel } from '../../data/models/payment'

export interface IPaymentRepository {
	find (data: { userId: string, id: string }): Promise<PaymentEntity | null>

	create (data: PaymentToModel): Promise<PaymentEntity>

	markAsComplete (intent: string, userId: string): Promise<boolean>
}