// @ts-ignore
import { makeEnum, setEnums } from '../commons'


const Ar = makeEnum({
	isStranerdAdmin: 'isStranerdAdmin',
	isStranerdTutor: 'isStranerdTutor',
	isSuperAdmin: 'isSuperAdmin',
	isSubscribed: 'isSubscribed'
})

setEnums({ AuthRole: Ar })

// @ts-ignore
declare module '@utils/app/commons/enums/types' {
	type TAr = typeof Ar
    interface IAuthRole extends TAr {}
}