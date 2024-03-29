import { makeEnum } from '../package'

const Ar = makeEnum('AuthRole', {
	isStranerdAdmin: 'isStranerdAdmin',
	isStranerdTutor: 'isStranerdTutor',
	isSuperAdmin: 'isSuperAdmin',
	isSubscribed: 'isSubscribed'
} as const)

const El = makeEnum('EmailsList', {
	NO_REPLY: 'no-reply@stranerd.com'
} as const)

const Ev = makeEnum('EventTypes', {
	SENDMAIL: 'SENDMAIL',
	SENDTEXT:'SENDTEXT',
	DELETEFILE: 'DELETEFILE'
} as const)

const Dj = makeEnum('DelayedJobs', {
	TestTimer: 'TestTimer',
	RenewSubscription: 'RenewSubscription',
	ClassEvent: 'ClassEvent'
} as const)

const Clj = makeEnum('CronLikeJobs', {
	ClassEvent: 'ClassEvent'
} as const)

// @ts-ignore
declare module 'equipped/lib/enums/types' {
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