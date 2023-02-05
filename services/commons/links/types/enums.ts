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

setEnums({ AuthRole: Ar, EmailsList: El, EventTypes: Ev })

// @ts-ignore
declare module '@utils/app/commons/enums/types' {
	type TAr = typeof Ar
	type TEl = typeof El
	type TEv = typeof Ev
    interface IAuthRole extends TAr {}
    interface IEmailsList extends TEl {}
    interface IEventTypes extends TEv {}
}