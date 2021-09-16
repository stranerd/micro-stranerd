import { ChangeStreamCallbacks } from '@utils/commons'
import { PaymentEntity, PaymentFromModel, PaymentType } from '@modules/payments'
import { addUserCoins } from '@utils/modules/users/transactions'
import { getSocketEmitter } from '@index'

export const PaymentChangeStreamCallbacks: ChangeStreamCallbacks<PaymentFromModel, PaymentEntity> = {
	created: async ({ after }) => {
		await getSocketEmitter().emitMineCreated('payments', after, after.userId)
		await getSocketEmitter().emitMineCreated(`payments/${after.id}`, after, after.userId)
	},
	updated: async ({ after, changes }) => {
		await getSocketEmitter().emitMineUpdated('payments', after, after.userId)
		await getSocketEmitter().emitMineUpdated(`payments/${after.id}`, after, after.userId)
		if (changes.isCompleted && after.isCompleted) {
			if (after.type === PaymentType.BuyCoins) {
				const gold = after.data.gold ?? 0
				const bronze = after.data.bronze ?? 0
				await addUserCoins(after.userId, { gold, bronze }, 'You purchased coins')
			}
		}
	},
	deleted: async ({ before }) => {
		await getSocketEmitter().emitMineDeleted('payments', before, before.userId)
		await getSocketEmitter().emitMineDeleted(`payments/${before.id}`, before, before.userId)
	}
}