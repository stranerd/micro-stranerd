import { UserTypes } from './user-types'

export interface UserModel {
	_id?: string | null;
	email: string;
	password?: string | null;
	roles: UserTypes;
	name: string;
	photoUrl?: string | null;
	isVerified: boolean;
	authTypes: string[];
	lastSignedInAt?: number | null;
	signedUpAt: number
}