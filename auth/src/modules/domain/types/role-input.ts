import { AuthUser } from '@utils/commons'

export interface RoleInput {
	app: AppTypes
	userId: string
	role: RoleTypes
	value: boolean
}

export type AppTypes = keyof AuthUser['roles']
export type RoleTypes = keyof AuthUser['roles'][AppTypes]