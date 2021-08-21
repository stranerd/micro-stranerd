import { UserTypes, UserPhoto, AuthTypes } from '../../application/domain'

export interface UserEntity {
	_id?: string | null;
	email: string;
	password?: string | null;
	roles: UserTypes;
	firstName: string;
	lastName: string;
	photo?: UserPhoto | null;
	isVerified: boolean;
	authTypes: AuthTypes[];
	lastSignedInAt?: number | null;
	signedUpAt: number
}