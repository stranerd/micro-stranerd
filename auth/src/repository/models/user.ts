import { AuthRoles, AuthTypes, MediaOutput } from '@utils/commons'

export interface UserFromModel extends UserToModel {
	_id: string;
}

export interface UserToModel {
	email: string;
	password: string;
	roles: AuthRoles;
	firstName: string;
	lastName: string;
	photo: MediaOutput | null;
	isVerified: boolean;
	authTypes: AuthTypes[];
	lastSignedInAt: number;
	signedUpAt: number
}