import { AuthRoles, AuthTypes, MediaOutput } from '@utils/commons'

export interface UserEntity {
	_id?: string | null;
	email: string;
	password: string | null;
	roles: AuthRoles;
	firstName: string;
	lastName: string;
	photo: MediaOutput | null;
	isVerified: boolean;
	authTypes: AuthTypes[];
	lastSignedInAt: number | null;
	signedUpAt: number
}