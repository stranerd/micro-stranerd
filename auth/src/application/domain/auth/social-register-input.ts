import { UserPhoto } from '../user/photo'

export interface SocialRegisterInput {
	email: string;
	firstName: string;
	lastName: string;
	password?: string | null;
	photo?: UserPhoto | null;
	type: string;
}