import { AuthTypes, MediaOutput } from '@utils/commons'

export interface SocialRegisterInput {
	email: string;
	firstName: string;
	lastName: string;
	password: string | null;
	photo: MediaOutput | null;
	type: AuthTypes;
}