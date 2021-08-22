import { AuthRoles, AuthTypes, MediaOutput } from '@utils/commons'

export interface UserModel {
	id: string;
	email: string;
	password: string | null;
	roles: AuthRoles;
	firstName: string;
	lastName: string;
	photo: MediaOutput | null;
	isVerified: boolean;
	authTypes: AuthTypes[];
	lastSignedInAt: number;
	signedUpAt: number
}