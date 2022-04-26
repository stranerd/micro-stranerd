export enum DelayedJobs {
	SessionTimer = 'SessionTimer',
	ScheduledSessionStart = 'ScheduledSessionStart',
	ScheduledSessionNotification = 'ScheduledSessionNotification',
	TestTimer = 'TestTimer'
}

export type DelayedEvent = {
	type: DelayedJobs.SessionTimer,
	data: { sessionId: string }
} | {
	type: typeof DelayedJobs.ScheduledSessionStart,
	data: { sessionId: string, studentId: string, tutorId: string }
} | {
	type: typeof DelayedJobs.ScheduledSessionNotification,
	data: { sessionId: string, studentId: string, tutorId: string, timeInSec: number }
} | {
	type: typeof DelayedJobs.TestTimer,
	data: { testId: string, userId: string }
}