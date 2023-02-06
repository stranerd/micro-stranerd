import { IDelayedJobs, ICronLikeJobs } from '../enums/types'

export enum CronTypes {
	secondly = 'secondly',
	minutely = 'minutely',
	hourly = 'hourly',
	daily = 'daily',
	weekly = 'weekly',
	monthly = 'monthly',
	quarterly = 'quarterly',
	yearly = 'yearly'
}

interface DelayedEvent {
	type: IDelayedJobs[keyof IDelayedJobs]
	data: any
}

interface CronLikeEvent {
	type: ICronLikeJobs[keyof ICronLikeJobs]
	data: any
}


export interface DelayedJobEvents extends Record<IDelayedJobs[keyof IDelayedJobs], DelayedEvent> {}
export interface CronLikeJobsEvents extends Record<ICronLikeJobs[keyof ICronLikeJobs], CronLikeEvent> {}

export type DelayedJobEvent = DelayedJobEvents[keyof DelayedJobEvents]
export type CronLikeJobEvent = CronLikeJobsEvents[keyof CronLikeJobsEvents]