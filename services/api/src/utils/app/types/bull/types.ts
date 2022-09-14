export enum DelayedJobs {
	SessionTimer = 'SessionTimer',
	ScheduledSessionStart = 'ScheduledSessionStart',
	ScheduledSessionNotification = 'ScheduledSessionNotification',
	TestTimer = 'TestTimer',
	RenewSubscription = 'RenewSubscription',
	ClassEvent = 'ClassEvent'
}

export enum CronLikeJobs {
	ClassEvent = 'ClassEvent'
}

export type DelayedEvent = {
	type: DelayedJobs.SessionTimer,
	data: { sessionId: string }
} | {
	type: typeof DelayedJobs.ScheduledSessionStart,
	data: { sessionId: string, studentId: string, tutorId: string }
} | {
	type: typeof DelayedJobs.ScheduledSessionNotification,
	data: { sessionId: string, studentId: string, tutorId: string, timeInMin: number }
} | {
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