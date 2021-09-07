import { MediaOutput } from '@utils/commons'

export interface RegisterInput {
	email: string;
	firstName: string;
	lastName: string;
	password: string;
	photo: MediaOutput | null;
	referrer: string | null;
}