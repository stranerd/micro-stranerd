import { ChangeStreamCallbacks } from '@utils/commons'
import { FindUser, ReferralEntity, ReferralFromModel } from '@modules/users'
import { sendNotification } from '@utils/modules/users/notifications'
import { getSocketEmitter } from '@index'

getSocketEmitter().register('users/referrals', getSocketEmitter().quickRegisters.isMine)
export const ReferralChangeStreamCallbacks: ChangeStreamCallbacks<ReferralFromModel, ReferralEntity> = {
	created: async ({ after }) => {
		await getSocketEmitter().emitPathCreated('users/referrals', after, after.userId)
		await getSocketEmitter().emitPathCreated(`users/referrals/${after.id}`, after, after.userId)
		const user = await FindUser.execute(after.referred)
		if (user) await sendNotification(after.userId, {
			title: 'New Referral Signup',
			body: `${user.bio.email} just signed up with your referral link. Checkout his/her profile`,
			action: 'users',
			data: { userId: user.id }
		})
	},
	updated: async ({ after }) => {
		await getSocketEmitter().emitPathUpdated('users/referrals', after, after.userId)
		await getSocketEmitter().emitPathUpdated(`users/referrals/${after.id}`, after, after.userId)
	},
	deleted: async ({ before }) => {
		await getSocketEmitter().emitPathDeleted('users/referrals', before, before.userId)
		await getSocketEmitter().emitPathDeleted(`users/referrals/${before.id}`, before, before.userId)
	}
}