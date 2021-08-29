import { AuthUser } from '@utils/commons'

export interface RoleInput {
	app: AppTypes;
	userId: string;
	role: RoleTypes;
	value: boolean;
}

export type RoleTypes = keyof AuthUser['roles'][AppTypes]
export type AppTypes = keyof AuthUser['roles']