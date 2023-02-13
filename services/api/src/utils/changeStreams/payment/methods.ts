import { MethodEntity, MethodFromModel } from '@modules/payment'
import { ChangeStreamCallbacks } from '@stranerd/api-commons'
import { appInstance } from '@utils/app/types'

export const MethodChangeStreamCallbacks: ChangeStreamCallbacks<MethodFromModel, MethodEntity> = {
	created: async ({ after }) => {
		await appInstance.socketEmitter.emitCreated(`payment/methods/${after.userId}`, after)
		await appInstance.socketEmitter.emitCreated(`payment/methods/${after.id}/${after.userId}`, after)
	},
	updated: async ({ after }) => {
		await appInstance.socketEmitter.emitUpdated(`payment/methods/${after.userId}`, after)
		await appInstance.socketEmitter.emitUpdated(`payment/methods/${after.id}/${after.userId}`, after)
	},
	deleted: async ({ before }) => {
		await appInstance.socketEmitter.emitDeleted(`payment/methods/${before.userId}`, before)
		await appInstance.socketEmitter.emitDeleted(`payment/methods/${before.id}/${before.userId}`, before)
	}
}