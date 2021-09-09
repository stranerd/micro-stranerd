import { BaseMapper } from '@utils/commons'
import { TransactionEntity } from '../../domain/entities/transactions'
import { TransactionFromModel, TransactionToModel } from '../models/transactions'

export class TransactionMapper extends BaseMapper<TransactionFromModel, TransactionToModel, TransactionEntity> {
	mapFrom (param: TransactionFromModel | null) {
		return !param ? null : new TransactionEntity({
			id: param._id.toString(),
			isGold: param.isGold,
			event: param.event,
			userId: param.userId,
			amount: param.amount,
			createdAt: param.createdAt,
			updatedAt: param.updatedAt
		})
	}

	mapTo (param: TransactionEntity) {
		return {
			isGold: param.isGold,
			amount: param.amount,
			event: param.event,
			userId: param.userId
		}
	}
}