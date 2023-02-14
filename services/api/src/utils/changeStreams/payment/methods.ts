import { MethodEntity, MethodFromModel } from '@modules/payment'
import { ChangeStreamCallbacks } from '@utils/app/package'
import { appInstance } from '@utils/app/types'

export const MethodChangeStreamCallbacks: ChangeStreamCallbacks<MethodFromModel, MethodEntity> = {
	created: async ({ after }) => {
		await appInstance.listener.created(`payment/methods/${after.userId}`, after)
		await appInstance.listener.created(`payment/methods/${after.id}/${after.userId}`, after)
	},
	updated: async ({ after }) => {
		await appInstance.listener.updated(`payment/methods/${after.userId}`, after)
		await appInstance.listener.updated(`payment/methods/${after.id}/${after.userId}`, after)
	},
	deleted: async ({ before }) => {
		await appInstance.listener.deleted(`payment/methods/${before.userId}`, before)
		await appInstance.listener.deleted(`payment/methods/${before.id}/${before.userId}`, before)
	}
}