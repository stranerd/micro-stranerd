import { ChangeStreamCallbacks } from '@utils/commons'
import { TransactionEntity, TransactionFromModel } from '@modules/users'
import { getSocketEmitter } from '@index'

export const TransactionChangeStreamCallbacks: ChangeStreamCallbacks<TransactionFromModel, TransactionEntity> = {
	created: async ({ after }) => {
		await getSocketEmitter().emitCreated(`transactions/${after.userId}`, after)
		await getSocketEmitter().emitCreated(`transactions/${after.id}/${after.userId}`, after)
	},
	updated: async ({ after }) => {
		await getSocketEmitter().emitUpdated(`transactions/${after.userId}`, after)
		await getSocketEmitter().emitUpdated(`transactions/${after.id}/${after.userId}`, after)
	},
	deleted: async ({ before }) => {
		await getSocketEmitter().emitDeleted(`transactions/${before.userId}`, before)
		await getSocketEmitter().emitDeleted(`transactions/${before.id}/${before.userId}`, before)
	}
}