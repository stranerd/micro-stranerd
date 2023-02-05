import { IAuthRole } from './types'

export const makeEnum = <T extends Readonly<Record<any, any>>> (obj: T) => {
	return Object.fromEntries(
		Object.keys(obj).map((i) => [i, i])
	) as { readonly [K in keyof T]: K }
}

export let AuthRole: IAuthRole = makeEnum({}) as any

type Param = Partial<{
    AuthRole: IAuthRole
}>

export const setEnums = (data: Param) => {
	if (data.AuthRole) AuthRole = data.AuthRole
}