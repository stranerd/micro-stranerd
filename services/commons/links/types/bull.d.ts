// @ts-ignore
import { CronLikeJobs, DelayedJobs } from '../commons'
import { Clj, Dj } from './enums'


declare module '@utils/app/commons/bull/types' {
    interface DelayedJobEvents {
		[DelayedJobs.TestTimer]: {
			type: typeof Dj.TestTimer,
			data: { testId: string, userId: string }
		},
		[DelayedJobs.RenewSubscription]: {
			type: typeof Dj.RenewSubscription,
			data: { userId: string }
		},
		[DelayedJobs.ClassEvent]: {
			type: typeof Dj.ClassEvent,
			data: { eventId: string, timeInMin: number }
		}
	}

    interface CronLikeJobEvents {
		[CronLikeJobs.ClassEvent]: {
			type: typeof Clj.ClassEvent,
			data: { eventId: string, timeInMin: number }
		}
	}
}