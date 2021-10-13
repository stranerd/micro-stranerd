import { PaymentEntity } from '../../domain/entities/payment'
import { BaseMapper } from '@utils/commons'
import { PaymentFromModel, PaymentToModel } from '../models/payment'

export class PaymentMapper extends BaseMapper<PaymentFromModel, PaymentToModel, PaymentEntity> {
	mapFrom (param: PaymentFromModel | null) {
		return !param ? null : new PaymentEntity({
			id: param._id.toString(),
			data: param.data,
			method: param.method,
			type: param.type,
			userId: param.userId,
			intent: param.intent,
			amount: param.amount,
			currency: param.currency,
			createdAt: param.createdAt,
			isCompleted: param.isCompleted,
			updatedAt: param.updatedAt
		})
	}

	mapTo (param: PaymentEntity) {
		return {
			data: param.data,
			method: param.method,
			amount: param.amount,
			currency: param.currency,
			type: param.type,
			userId: param.userId,
			intent: param.intent,
			isCompleted: param.isCompleted
		}
	}
}