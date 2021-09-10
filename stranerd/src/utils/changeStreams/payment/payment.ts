import { ChangeStreamCallbacks } from '@utils/commons'
import { PaymentEntity, PaymentFromModel, PaymentType } from '@modules/payments'
import { addUserCoins } from '@utils/modules/users/transactions'

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