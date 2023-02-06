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

const Ev = makeEnum({
	SENDMAIL: 'SENDMAIL',
	SENDTEXT:'SENDTEXT',
	DELETEFILE: 'DELETEFILE'
} as const)

const Dj = makeEnum({
	TestTimer: 'TestTimer',
	RenewSubscription: 'RenewSubscription',
	ClassEvent: 'ClassEvent'
} as const)

const Clj = makeEnum({
	ClassEvent: 'ClassEvent'
} as const)

const Ct = makeEnum({
	hourly: 'hourly',
	daily: 'daily',
	weekly: 'weekly',
	monthly: 'monthly'
} as const)

setEnums({
	AuthRole: Ar, EmailsList: El, EventTypes: Ev,
	CronTypes: Ct, DelayedJobs: Dj, CronLikeJobs: Clj
})

// @ts-ignore
declare module '@utils/app/commons/enums/types' {
	type TAr = typeof Ar
	type TEl = typeof El
	type TEv = typeof Ev
	type TCt = typeof Ct
	type TDj = typeof Dj
	type TClj = typeof Clj
    interface IAuthRole extends TAr {}
    interface IEmailsList extends TEl {}
    interface IEventTypes extends TEv {}
    interface ICronTypes extends TCt {}
    interface IDelayedJobs extends TDj {}
    interface ICronLikeJobs extends TClj {}
}