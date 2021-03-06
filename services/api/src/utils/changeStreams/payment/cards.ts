import { ChangeStreamCallbacks } from '@utils/commons'
import { CardEntity, CardFromModel } from '@modules/payment'
import { getSocketEmitter } from '@index'

export const CardChangeStreamCallbacks: ChangeStreamCallbacks<CardFromModel, CardEntity> = {
	created: async ({ after }) => {
		await getSocketEmitter().emitCreated(`payment/cards/${after.userId}`, after)
		await getSocketEmitter().emitCreated(`payment/cards/${after.id}/${after.userId}`, after)
	},
	updated: async ({ after }) => {
		await getSocketEmitter().emitUpdated(`payment/cards/${after.userId}`, after)
		await getSocketEmitter().emitUpdated(`payment/cards/${after.id}/${after.userId}`, after)
	},
	deleted: async ({ before }) => {
		await getSocketEmitter().emitDeleted(`payment/cards/${before.userId}`, before)
		await getSocketEmitter().emitDeleted(`payment/cards/${before.id}/${before.userId}`, before)
	}
}