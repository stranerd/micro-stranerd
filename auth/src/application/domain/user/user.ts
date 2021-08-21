import { UserTypes } from './user-types'
import { UserPhoto } from './photo'

export interface UserModel {
	_id?: string | null;
	email: string;
	password?: string | null;
	roles: UserTypes;
	firstName: string;
	lastName: string;
	photo?: UserPhoto | null;
	isVerified: boolean;
	authTypes: string[];
	lastSignedInAt?: number | null;
	signedUpAt: number
}