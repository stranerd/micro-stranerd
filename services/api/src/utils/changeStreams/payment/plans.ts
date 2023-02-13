import { PlanEntity, PlanFromModel } from '@modules/payment'
import { ChangeStreamCallbacks } from '@utils/app/package'
import { appInstance } from '@utils/app/types'

export const PlanChangeStreamCallbacks: ChangeStreamCallbacks<PlanFromModel, PlanEntity> = {
	created: async ({ after }) => {
		await appInstance.socketEmitter.emitCreated('payment/plans', after)
		await appInstance.socketEmitter.emitCreated(`payment/plans/${after.id}`, after)
	},
	updated: async ({ after }) => {
		await appInstance.socketEmitter.emitUpdated('payment/plans', after)
		await appInstance.socketEmitter.emitUpdated(`payment/plans/${after.id}`, after)
	},
	deleted: async ({ before }) => {
		await appInstance.socketEmitter.emitDeleted('payment/plans', before)
		await appInstance.socketEmitter.emitDeleted(`payment/plans/${before.id}`, before)
	}
}