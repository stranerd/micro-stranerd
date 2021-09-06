export enum DelayedJobs {
	SessionTimer = 'SessionTimer',
	Test = 'Test'
}

export type DelayedEvent = {
	type: DelayedJobs.SessionTimer,
	data: { sessionId: string }
} | {
	type: typeof DelayedJobs.Test,
	data: { test: number }
}