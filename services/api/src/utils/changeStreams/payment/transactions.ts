import { ChangeStreamCallbacks } from '@utils/commons'
import { TransactionEntity, TransactionFromModel } from '@modules/payment'
import { getSocketEmitter } from '@index'

export const TransactionChangeStreamCallbacks: ChangeStreamCallbacks<TransactionFromModel, TransactionEntity> = {
	created: async ({ after }) => {
		await getSocketEmitter().emitCreated(`payment/transactions/${after.userId}`, after)
		await getSocketEmitter().emitCreated(`payment/transactions/${after.id}/${after.userId}`, after)
	},
	updated: async ({ after }) => {
		await getSocketEmitter().emitUpdated(`payment/transactions/${after.userId}`, after)
		await getSocketEmitter().emitUpdated(`payment/transactions/${after.id}/${after.userId}`, after)
	},
	deleted: async ({ before }) => {
		await getSocketEmitter().emitDeleted(`payment/transactions/${before.userId}`, before)
		await getSocketEmitter().emitDeleted(`payment/transactions/${before.id}/${before.userId}`, before)
	}
}