import { UserTypes, UserPhoto } from '../../application/domain'

export interface UserEntity {
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