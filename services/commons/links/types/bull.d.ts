// @ts-ignore
import { CronLikeJobs, DelayedJobs } from '../commons'

declare module '@utils/app/commons/bull' {
    interface DelayedJobEvents {
		[DelayedJobs.TestTimer]: {
			type: typeof DelayedJobs.TestTimer,
			data: { testId: string, userId: string }
		},
		[DelayedJobs.RenewSubscription]: {
			type: typeof DelayedJobs.RenewSubscription,
			data: { userId: string }
		},
		[DelayedJobs.ClassEvent]: {
			type: typeof DelayedJobs.ClassEvent,
			data: { eventId: string, timeInMin: number }
		}
	}

    interface CronLikeJobEvents {
		[CronLikeJobs.ClassEvent]: {
			type: typeof CronLikeJobs.ClassEvent,
			data: { eventId: string, timeInMin: number }
		}
	}
}