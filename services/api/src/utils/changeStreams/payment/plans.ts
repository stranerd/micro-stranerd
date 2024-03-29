import { PlanEntity, PlanFromModel } from '@modules/payment'
import { DbChangeCallbacks } from '@utils/app/package'
import { appInstance } from '@utils/app/types'

export const PlanDbChangeCallbacks: DbChangeCallbacks<PlanFromModel, PlanEntity> = {
	created: async ({ after }) => {
		await appInstance.listener.created('payment/plans', after)
		await appInstance.listener.created(`payment/plans/${after.id}`, after)
	},
	updated: async ({ after }) => {
		await appInstance.listener.updated('payment/plans', after)
		await appInstance.listener.updated(`payment/plans/${after.id}`, after)
	},
	deleted: async ({ before }) => {
		await appInstance.listener.deleted('payment/plans', before)
		await appInstance.listener.deleted(`payment/plans/${before.id}`, before)
	}
}