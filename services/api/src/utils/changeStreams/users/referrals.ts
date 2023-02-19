import { ReferralEntity, ReferralFromModel } from '@modules/users'
import { DbChangeCallbacks } from '@utils/app/package'
import { appInstance } from '@utils/app/types'

export const ReferralDbChangeCallbacks: DbChangeCallbacks<ReferralFromModel, ReferralEntity> = {
	created: async ({ after }) => {
		await appInstance.listener.created(`users/referrals/${after.userId}`, after)
		await appInstance.listener.created(`users/referrals/${after.id}/${after.userId}`, after)
	},
	updated: async ({ after }) => {
		await appInstance.listener.updated(`users/referrals/${after.userId}`, after)
		await appInstance.listener.updated(`users/referrals/${after.id}/${after.userId}`, after)
	},
	deleted: async ({ before }) => {
		await appInstance.listener.deleted(`users/referrals/${before.userId}`, before)
		await appInstance.listener.deleted(`users/referrals/${before.id}/${before.userId}`, before)
	}
}