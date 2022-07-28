import { appInstance, ChangeStreamCallbacks, SupportedAuthRoles } from '@utils/commons'
import { WalletEntity, WalletFromModel } from '@modules/payment'
import { getSocketEmitter } from '@index'
import { AuthUsersUseCases } from '@modules/auth'

export const WalletChangeStreamCallbacks: ChangeStreamCallbacks<WalletFromModel, WalletEntity> = {
	created: async ({ after }) => {
		await getSocketEmitter().emitCreated(`payment/wallets/${after.userId}`, after)
		await getSocketEmitter().emitCreated(`payment/wallets/${after.id}/${after.userId}`, after)

		await AuthUsersUseCases.updateUserRole({
			userId: after.userId, roles: { [SupportedAuthRoles.isSubscribed]: after.subscription.active }
		})
	},
	updated: async ({ after, before, changes }) => {
		await getSocketEmitter().emitUpdated(`payment/wallets/${after.userId}`, after)
		await getSocketEmitter().emitUpdated(`payment/wallets/${after.id}/${after.userId}`, after)

		if (changes.subscription?.active) await AuthUsersUseCases.updateUserRole({
			userId: after.userId, roles: { [SupportedAuthRoles.isSubscribed]: after.subscription.active }
		})
		if (before.subscription.current?.jobId !== after.subscription.current?.jobId && before.subscription.current?.jobId) await appInstance.job.removeDelayedJob(before.subscription.current.jobId)
	},
	deleted: async ({ before }) => {
		await getSocketEmitter().emitDeleted(`payment/wallets/${before.userId}`, before)
		await getSocketEmitter().emitDeleted(`payment/wallets/${before.id}/${before.userId}`, before)

		await AuthUsersUseCases.updateUserRole({
			userId: before.userId, roles: { [SupportedAuthRoles.isSubscribed]: before.subscription.active }
		})
		if (before.subscription.current?.jobId) await appInstance.job.removeDelayedJob(before.subscription.current.jobId)
	}
}