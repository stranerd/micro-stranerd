import { ChangeStreamCallbacks } from '@utils/commons'
import { TransactionEntity, TransactionFromModel } from '@modules/payment'
import { getSocketEmitter } from '@index'

export const TransactionChangeStreamCallbacks: ChangeStreamCallbacks<TransactionFromModel, TransactionEntity> = {
	created: async ({ after }) => {
		await getSocketEmitter().emitCreated(`payment/plans/${after.userId}`, after)
		await getSocketEmitter().emitCreated(`payment/plans/${after.id}/${after.userId}`, after)
	},
	updated: async ({ after }) => {
		await getSocketEmitter().emitUpdated(`payment/plans/${after.userId}`, after)
		await getSocketEmitter().emitUpdated(`payment/plans/${after.id}/${after.userId}`, after)
	},
	deleted: async ({ before }) => {
		await getSocketEmitter().emitDeleted(`payment/plans/${before.userId}`, before)
		await getSocketEmitter().emitDeleted(`payment/plans/${before.id}/${before.userId}`, before)
	}
}