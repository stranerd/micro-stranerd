import { ChangeStreamCallbacks } from '@utils/commons'
import { FindUser, ReferralEntity, ReferralFromModel } from '@modules/users'
import { sendNotification } from '@utils/modules/users/notifications'
import { getSocketEmitter } from '@index'

export const ReferralChangeStreamCallbacks: ChangeStreamCallbacks<ReferralFromModel, ReferralEntity> = {
	created: async ({ after }) => {
		await getSocketEmitter().emitMineCreated('users/referrals', after, after.userId)
		await getSocketEmitter().emitMineCreated(`users/referrals/${after.id}`, after, after.userId)
		const user = await FindUser.execute(after.referred)
		if (user) await sendNotification(after.userId, {
			title: 'New Referral Signup',
			body: `${user.bio.email} just signed up with your referral link. Checkout his/her profile`,
			action: 'users',
			data: { userId: user.id }
		})
	},
	updated: async ({ after }) => {
		await getSocketEmitter().emitMineUpdated('users/referrals', after, after.userId)
		await getSocketEmitter().emitMineUpdated(`users/referrals/${after.id}`, after, after.userId)
	},
	deleted: async ({ before }) => {
		await getSocketEmitter().emitMineDeleted('users/referrals', before, before.userId)
		await getSocketEmitter().emitMineDeleted(`users/referrals/${before.id}`, before, before.userId)
	}
}