import { TransactionEntity, TransactionFromModel, TransactionStatus } from '@modules/payment'
import { ChangeStreamCallbacks } from '@utils/app/package'
import { appInstance } from '@utils/app/types'
import { fulfillTransaction } from '@utils/modules/payment/transactions'

export const TransactionChangeStreamCallbacks: ChangeStreamCallbacks<TransactionFromModel, TransactionEntity> = {
	created: async ({ after }) => {
		await appInstance.listener.created(`payment/transactions/${after.userId}`, after)
		await appInstance.listener.created(`payment/transactions/${after.id}/${after.userId}`, after)

		if (after.status === TransactionStatus.fulfilled) await fulfillTransaction(after)
	},
	updated: async ({ after, before, changes }) => {
		await appInstance.listener.updated(`payment/transactions/${after.userId}`, after)
		await appInstance.listener.updated(`payment/transactions/${after.id}/${after.userId}`, after)

		if (changes.status) {
			if (before.status === TransactionStatus.initialized && after.status === TransactionStatus.fulfilled) await fulfillTransaction(after)
		}
	},
	deleted: async ({ before }) => {
		await appInstance.listener.deleted(`payment/transactions/${before.userId}`, before)
		await appInstance.listener.deleted(`payment/transactions/${before.id}/${before.userId}`, before)
	}
}