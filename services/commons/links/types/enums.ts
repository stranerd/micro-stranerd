// @ts-ignore
import { makeEnum, setEnums } from '../commons'


const Ar = makeEnum({
	isStranerdAdmin: 'isStranerdAdmin',
	isStranerdTutor: 'isStranerdTutor',
	isSuperAdmin: 'isSuperAdmin',
	isSubscribed: 'isSubscribed'
} as const)

const El = makeEnum({
	NO_REPLY: 'no-reply@stranerd.com'
} as const)

export const Ev = makeEnum({
	SENDMAIL: 'SENDMAIL',
	SENDTEXT:'SENDTEXT',
	DELETEFILE: 'DELETEFILE'
} as const)

export const Dj = makeEnum({
	TestTimer: 'TestTimer',
	RenewSubscription: 'RenewSubscription',
	ClassEvent: 'ClassEvent'
} as const)

export const Clj = makeEnum({
	ClassEvent: 'ClassEvent'
} as const)

setEnums({ AuthRole: Ar, EmailsList: El, EventTypes: Ev, DelayedJobs: Dj, CronLikeJobs: Clj })

// @ts-ignore
declare module '@utils/app/commons/enums/types' {
	type TAr = typeof Ar
	type TEl = typeof El
	type TEv = typeof Ev
	type TDj = typeof Dj
	type TClj = typeof Clj
    interface IAuthRole extends TAr {}
    interface IEmailsList extends TEl {}
    interface IEventTypes extends TEv {}
    interface IDelayedJobs extends TDj {}
    interface ICronLikeJobs extends TClj {}
}