export enum JobNames {
	CronJob = 'CronJob',
	DelayedJob = 'DelayedJob'
}

export type DelayedJobCallback<Event> = (data: Event) => Promise<void>

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