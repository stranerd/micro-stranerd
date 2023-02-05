import { IAuthRole, IEmailsList } from './types'

export const makeEnum = <T extends Record<string, any>> (obj: T) => {
	return Object.freeze(obj)
}

export let AuthRole: IAuthRole = makeEnum({}) as any
export let EmailsList: IEmailsList = makeEnum({}) as any

type Param = Partial<{
    AuthRole: IAuthRole
	EmailsList: IEmailsList
}>

export const setEnums = (data: Param) => {
	if (data.AuthRole) AuthRole = data.AuthRole
	if (data.EmailsList) EmailsList = data.EmailsList
}