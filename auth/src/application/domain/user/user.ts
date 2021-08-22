import { AuthTypes, AuthUser, MediaOutput } from '@utils/commons'

export interface UserModel {
	_id?: string | null;
	email: string;
	password: string | null;
	roles: AuthUser['roles'];
	firstName: string;
	lastName: string;
	photo: MediaOutput | null;
	isVerified: boolean;
	authTypes: AuthTypes[];
	lastSignedInAt: number | null;
	signedUpAt: number
}