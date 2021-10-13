import { ChangeStreamCallbacks } from '@utils/commons'
import { TransactionEntity, TransactionFromModel } from '@modules/users'
import { getSocketEmitter } from '@index'

export const TransactionChangeStreamCallbacks: ChangeStreamCallbacks<TransactionFromModel, TransactionEntity> = {
	created: async ({ after }) => {
		await getSocketEmitter().emitMineCreated('transactions', after, after.userId)
		await getSocketEmitter().emitMineCreated(`transactions/${after.id}`, after, after.userId)
	},
	updated: async ({ after }) => {
		await getSocketEmitter().emitMineUpdated('transactions', after, after.userId)
		await getSocketEmitter().emitMineUpdated(`transactions/${after.id}`, after, after.userId)
	},
	deleted: async ({ before }) => {
		await getSocketEmitter().emitMineDeleted('transactions', before, before.userId)
		await getSocketEmitter().emitMineDeleted(`transactions/${before.id}`, before, before.userId)
	}
}