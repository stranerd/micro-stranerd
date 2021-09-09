import { ChangeStreamCallbacks } from '@utils/commons'
import { PaymentFromModel } from '@modules/payments/data/models/payment'
import { PaymentEntity } from '@modules/payments/domain/entities/payment'
import { addUserCoins } from '@utils/modules/users/transactions'
import { PaymentType } from '@modules/payments/domain/types'

export const PaymentChangeStreamCallbacks: ChangeStreamCallbacks<PaymentFromModel, PaymentEntity> = {
	updated: async ({ after, changes }) => {
		if (changes.isCompleted && after.isCompleted) {
			if (after.type === PaymentType.BuyCoins) {
				const gold = after.data.gold ?? 0
				const bronze = after.data.bronze ?? 0
				await addUserCoins(after.userId, { gold, bronze }, 'You purchased coins')
			}
		}
	}
}