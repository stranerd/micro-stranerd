import { CronTypes } from '@utils/app/package'
import { appInstance, CronLikeEvent, CronLikeJobs, DelayedEvent, DelayedJobs } from '@utils/app/types'
import { NotificationsUseCases, UserRankings, UsersUseCases } from '@modules/users'
import { deleteUnverifiedUsers } from '@utils/modules/auth'
import { MethodsUseCases } from '@modules/payment'
import { EmailErrorsUseCases, PhoneErrorsUseCases } from '@modules/feedback'
import { sendMailAndCatchError } from '@utils/modules/feedback/email'
import { retryTransactions } from '@utils/modules/payment/transactions'
import { broadcastEvent } from '@utils/modules/classes/events'
import { TestsUseCases } from '@modules/study'
import { renewSubscription } from '@utils/modules/payment/subscriptions'
import { sendTextAndCatchError } from '@utils/modules/feedback/phone'

export const startJobs = async () => {
	await appInstance.job.startProcessingQueues<DelayedEvent, CronLikeEvent>([
		{ name: CronTypes.hourly, cron: '0 * * * *' },
		{ name: CronTypes.daily, cron: '0 0 * * *' },
		{ name: CronTypes.weekly, cron: '0 0 * * SUN' },
		{ name: CronTypes.monthly, cron: '0 0 1 * *' }
	], {
		onDelayed: async (data) => {
			if (data.type === DelayedJobs.TestTimer) await TestsUseCases.update({
				id: data.data.testId,
				userId: data.data.userId,
				data: { done: true }
			})
			if (data.type === DelayedJobs.ClassEvent) await broadcastEvent(data.data.eventId, data.data.timeInMin)
			if (data.type === DelayedJobs.RenewSubscription) await renewSubscription(data.data.userId)
		},
		onCronLike: async (data) => {
			if (data.type === CronLikeJobs.ClassEvent) await broadcastEvent(data.data.eventId, data.data.timeInMin)
		},
		onCron: async (type) => {
			if (type === CronTypes.daily) {
				await UsersUseCases.resetRankings(UserRankings.daily)
				await deleteUnverifiedUsers()
			}
			if (type === CronTypes.weekly) {
				await UsersUseCases.resetRankings(UserRankings.weekly)
				await NotificationsUseCases.deleteOldSeen()
			}
			if (type === CronTypes.monthly) {
				await UsersUseCases.resetRankings(UserRankings.monthly)
				await MethodsUseCases.markExpireds()
			}
			if (type === CronTypes.hourly) {
				const emails = await EmailErrorsUseCases.getAndDeleteAll()
				await Promise.all(emails.map((e) => sendMailAndCatchError(e as any)))
				const texts = await PhoneErrorsUseCases.getAndDeleteAll()
				await Promise.all(texts.map((t) => sendTextAndCatchError(t as any)))
				await retryTransactions(60 * 60 * 1000)
				await appInstance.job.retryAllFailedJobs()
			}
		}
	})
}