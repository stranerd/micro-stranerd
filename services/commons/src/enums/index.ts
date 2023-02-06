import { IAuthRole, IEmailsList, IEventTypes, IDelayedJobs, ICronLikeJobs } from './types'

export const makeEnum = <T extends Record<string, any>> (obj: T) => {
	return Object.freeze(obj)
}

export let AuthRole: IAuthRole = makeEnum({}) as any
export let EmailsList: IEmailsList = makeEnum({}) as any
export let EventTypes: IEventTypes = makeEnum({}) as any
export let DelayedJobs: IDelayedJobs = makeEnum({}) as any
export let CronLikeJobs: ICronLikeJobs = makeEnum({}) as any

type Param = Partial<{
    AuthRole: IAuthRole
	EmailsList: IEmailsList
	EventTypes: IEventTypes
	DelayedJobs: IDelayedJobs
	CronLikeJobs: ICronLikeJobs
}>

export const setEnums = (data: Param) => {
	if (data.AuthRole) AuthRole = data.AuthRole
	if (data.EmailsList) EmailsList = data.EmailsList
	if (data.EventTypes) EventTypes = data.EventTypes
	if (data.DelayedJobs) DelayedJobs = data.DelayedJobs
	if (data.CronLikeJobs) CronLikeJobs = data.CronLikeJobs
}