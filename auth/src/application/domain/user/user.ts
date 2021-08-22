import { UserTypes } from './user-types'
import { UserPhoto } from './photo'
import { AuthTypes } from '../auth/token-input'

export interface UserModel {
	_id?: string | null;
	email: string;
	password?: string | null;
	roles: UserTypes;
	firstName: string;
	lastName: string;
	photo: UserPhoto | null;
	isVerified: boolean;
	authTypes: AuthTypes[];
	lastSignedInAt: number | null;
	signedUpAt: number
}