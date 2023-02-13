import { ReferralEntity, ReferralFromModel } from '@modules/users'
import { ChangeStreamCallbacks } from '@utils/app/package'
import { appInstance } from '@utils/app/types'

export const ReferralChangeStreamCallbacks: ChangeStreamCallbacks<ReferralFromModel, ReferralEntity> = {
	created: async ({ after }) => {
		await appInstance.socketEmitter.emitCreated(`users/referrals/${after.userId}`, after)
		await appInstance.socketEmitter.emitCreated(`users/referrals/${after.id}/${after.userId}`, after)
	},
	updated: async ({ after }) => {
		await appInstance.socketEmitter.emitUpdated(`users/referrals/${after.userId}`, after)
		await appInstance.socketEmitter.emitUpdated(`users/referrals/${after.id}/${after.userId}`, after)
	},
	deleted: async ({ before }) => {
		await appInstance.socketEmitter.emitDeleted(`users/referrals/${before.userId}`, before)
		await appInstance.socketEmitter.emitDeleted(`users/referrals/${before.id}/${before.userId}`, before)
	}
}