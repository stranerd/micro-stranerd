import { PaymentEntity } from '@modules/payments/domain/entities/payment'
import { BaseMapper } from '@utils/commons'
import { PaymentFromModel, PaymentToModel } from '../models/payment'

export class PaymentMapper extends BaseMapper<PaymentFromModel, PaymentToModel, PaymentEntity> {
	mapFrom (param) {
		return !param ? null : new PaymentEntity({
			id: param._id.toString(),
			isGold: param.isGold,
			type: param.type,
			userId: param.userId,
			amount: param.amount,
			createdAt: param.createdAt,
			isCompleted: param.isCompleted,
			updatedAt: param.updatedAt
		})
	}

	mapTo (param) {
		return {
			isGold: param.isGold,
			amount: param.amount,
			type: param.type,
			userId: param.userId
		}
	}
}