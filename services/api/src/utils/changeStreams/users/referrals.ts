import { ChangeStreamCallbacks } from '@utils/commons'
import { FindUser, ReferralEntity, ReferralFromModel } from '@modules/users'
import { sendNotification } from '@utils/modules/users/notifications'
import { getSocketEmitter } from '@index'

export const ReferralChangeStreamCallbacks: ChangeStreamCallbacks<ReferralFromModel, ReferralEntity> = {
	created: async ({ after }) => {
		await getSocketEmitter().emitCreated(`users/referrals/${after.userId}`, after)
		await getSocketEmitter().emitCreated(`users/referrals/${after.id}/${after.userId}`, after)
		const user = await FindUser.execute(after.referred)
		if (user) await sendNotification(after.userId, {
			title: 'New Referral Signup',
			body: `${user.bio.email} just signed up with your referral link. Checkout his/her profile`,
			action: 'users',
			data: { userId: user.id }
		})
	},
	updated: async ({ after }) => {
		await getSocketEmitter().emitUpdated(`users/referrals/${after.userId}`, after)
		await getSocketEmitter().emitUpdated(`users/referrals/${after.id}/${after.userId}`, after)
	},
	deleted: async ({ before }) => {
		await getSocketEmitter().emitDeleted(`users/referrals/${before.userId}`, before)
		await getSocketEmitter().emitDeleted(`users/referrals/${before.id}/${before.userId}`, before)
	}
}