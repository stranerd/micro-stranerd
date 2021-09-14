import { AuthUser, MediaOutput } from '@utils/commons'

export interface UserUpdateInput {
	firstName: string
	lastName: string
	description: string
	photo: MediaOutput
}

export interface RoleInput {
	app: AppTypes
	userId: string
	role: RoleTypes
	value: boolean
}

export type AppTypes = keyof AuthUser['roles']
export type RoleTypes = keyof AuthUser['roles'][AppTypes]

export interface RegisterInput {
	email: string;
	firstName: string;
	lastName: string;
	password: string;
	description: string
	photo: MediaOutput | null;
	referrer: string | null;
}

export interface PasswordResetInput {
	token: string;
	password: string;
}

export interface Credential {
	email: string;
	password: string;
}

export interface AuthOutput {
	accessToken: string;
	refreshToken: string;
}