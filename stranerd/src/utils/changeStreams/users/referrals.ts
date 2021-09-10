import { ChangeStreamCallbacks } from '@utils/commons'
import { FindUser, ReferralEntity, ReferralFromModel } from '@modules/users'
import { addUserCoins } from '@utils/modules/users/transactions'
import { sendNotification } from '@utils/modules/users/notifications'

export const ReferralChangeStreamCallbacks: ChangeStreamCallbacks<ReferralFromModel, ReferralEntity> = {
	created: async ({ after }) => {
		await addUserCoins(
			after.userId,
			{ gold: 1, bronze: 20 },
			'Someone signed up with your referral link'
		)
		const user = await FindUser.execute(after.referred)
		if (user) await sendNotification(
			after.userId,
			{
				body: `A new user with the email: ${ user.bio.email } just signed up with your referral link. Checkout his/her profile`,
				action: 'users',
				data: { userId: user.id }
			},
			'New Referral Signup'
		)
	}
}