import { PaymentEntity } from '../entities/payment'
import { PaymentToModel } from '@modules/payments/data/models/payment'


export interface IPaymentRepository {
	find (data: { userId: string, id: string }): Promise<PaymentEntity | null>

	create (data: PaymentToModel): Promise<PaymentEntity>

	makeAsComplete (id: string): Promise<boolean | null>
}