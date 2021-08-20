import { UserTypes } from '../user/user-types'

export interface TokenInput {
	id: string;
	roles: UserTypes;
	isVerified: boolean;
	authTypes: AuthTypes[]
}

export type AuthTypes = 'google' | 'email' | 'facebook' | 'twitter'