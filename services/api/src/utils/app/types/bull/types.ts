export enum DelayedJobs {
	TestTimer = 'TestTimer',
	RenewSubscription = 'RenewSubscription',
	ClassEvent = 'ClassEvent'
}

export enum CronLikeJobs {
	ClassEvent = 'ClassEvent'
}

export type DelayedEvent = {
	type: typeof DelayedJobs.TestTimer,
	data: { testId: string, userId: string }
} | {
	type: typeof DelayedJobs.RenewSubscription,
	data: { userId: string }
} | {
	type: DelayedJobs.ClassEvent,
	data: { eventId: string, timeInMin: number }
}

export type CronLikeEvent = {
	type: CronLikeJobs.ClassEvent,
	data: { eventId: string, timeInMin: number }
}