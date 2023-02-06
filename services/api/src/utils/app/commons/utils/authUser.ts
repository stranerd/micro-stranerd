import { IAuthRole, Enum } from '../enums/types'

export interface RefreshUser {
	id: string
}

export interface AuthUser {
	id: string
	roles: AuthRoles
}

export enum AuthTypes {
	google = 'google',
	apple = 'apple',
	email = 'email',
	facebook = 'facebook',
	twitter = 'twitter',
	github = 'github',
	microsoft = 'microsoft'
}

export interface AuthRoles extends Partial<Record<Enum<IAuthRole>, boolean>> {}