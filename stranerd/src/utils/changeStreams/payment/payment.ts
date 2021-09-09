import { ChangeStreamCallbacks } from '@utils/commons'
import { PaymentFromModel } from '@modules/payments/data/models/payment'
import { PaymentEntity } from '@modules/payments/domain/entities/payment'
import { CreateTransaction } from '@modules/users'

export const PaymentChangeStreamCallbacks: ChangeStreamCallbacks<PaymentFromModel, PaymentEntity> = {

	 updated: async ({ after, changes }) => { 

		if (changes.isCompleted) await CreateTransaction.execute({
			amount: after.amount,
			event:  'buy coins',
			isGold:  after.isGold,
			userId:  after.userId
		})
	 }
}