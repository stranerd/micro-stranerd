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

export enum JobNames {
	CronJob = 'CronJob',
	DelayedJob = 'DelayedJob'
}

export type DelayedJobCallback = (data: DelayedEvent) => Promise<void>

export enum CronTypes {
	halfHourly = 'halfHourly',
	hourly = 'hourly',
	daily = 'daily',
	weekly = 'weekly',
	monthly = 'monthly',
	quarterly = 'quarterly',
	yearly = 'yearly',
}

export type CronCallback = (name: CronTypes) => Promise<void>