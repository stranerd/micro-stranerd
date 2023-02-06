import { IAuthRole, ICronLikeJobs, ICronTypes, IDelayedJobs, IEmailsList, IEventTypes } from './types'

type Keys = keyof {
    AuthRole: IAuthRole
	EmailsList: IEmailsList
	EventTypes: IEventTypes
	DelayedJobs: IDelayedJobs
	CronLikeJobs: ICronLikeJobs
	CronTypes: ICronTypes
}

export let AuthRole: IAuthRole = {} as any
export let EmailsList: IEmailsList = {} as any
export let EventTypes: IEventTypes = {} as any
export let DelayedJobs: IDelayedJobs = {} as any
export let CronLikeJobs: ICronLikeJobs = {} as any
export let CronTypes: ICronTypes = {
	hourly: 'hourly',
	daily: 'daily',
	weekly: 'weekly',
	monthly: 'monthly'
} as any

export const makeEnum = <T extends Record<string, any>> (key: Keys, obj: T) :Readonly<T> => {
	if (key === 'AuthRole') return AuthRole = { ...AuthRole, ...obj }
	if (key === 'EmailsList') return EmailsList = { ...EmailsList, ...obj }
	if (key === 'EventTypes') return EventTypes = { ...EventTypes, ...obj }
	if (key === 'DelayedJobs') return DelayedJobs = { ...DelayedJobs, ...obj }
	if (key === 'CronLikeJobs') return CronLikeJobs = { ...CronLikeJobs, ...obj }
	if (key === 'CronTypes') return CronTypes = { ...CronTypes, ...obj }
	return obj
}