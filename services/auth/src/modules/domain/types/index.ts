import { AuthApps, MediaOutput } from '@utils/commons'

export interface UserUpdateInput {
	firstName: string
	lastName: string
	description: string
	photo: MediaOutput | null
	coverPhoto: MediaOutput | null
}

export interface RoleInput {
	app: AuthApps
	userId: string
	role: string
	value: boolean
}

export interface RegisterInput extends UserUpdateInput {
	email: string;
	password: string;
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