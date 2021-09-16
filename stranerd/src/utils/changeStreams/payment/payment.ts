import { ChangeStreamCallbacks } from '@utils/commons'
import { PaymentEntity, PaymentFromModel, PaymentType } from '@modules/payments'
import { addUserCoins } from '@utils/modules/users/transactions'
import { getSocketEmitter } from '@index'

export const PaymentChangeStreamCallbacks: ChangeStreamCallbacks<PaymentFromModel, PaymentEntity> = {
	created: async ({ after }) => {
		await getSocketEmitter().emitCreated(`payments/${after.userId}`, after)
		await getSocketEmitter().emitCreated(`payments/${after.id}/${after.userId}`, after)
	},
	updated: async ({ after, changes }) => {
		await getSocketEmitter().emitUpdated(`payments/${after.userId}`, after)
		await getSocketEmitter().emitUpdated(`payments/${after.id}/${after.userId}`, after)
		if (changes.isCompleted && after.isCompleted) {
			if (after.type === PaymentType.BuyCoins) {
				const gold = after.data.gold ?? 0
				const bronze = after.data.bronze ?? 0
				await addUserCoins(after.userId, { gold, bronze }, 'You purchased coins')
			}
		}
	},
	deleted: async ({ before }) => {
		await getSocketEmitter().emitDeleted(`payments/${before.userId}`, before)
		await getSocketEmitter().emitDeleted(`payments/${before.id}/${before.userId}`, before)
	}
}