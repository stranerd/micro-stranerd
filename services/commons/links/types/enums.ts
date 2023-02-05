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

setEnums({ AuthRole: Ar, EmailsList: El })

// @ts-ignore
declare module '@utils/app/commons/enums/types' {
	type TAr = typeof Ar
	type TEl = typeof El
    interface IAuthRole extends TAr {}
    interface IEmailsList extends TEl {}
}