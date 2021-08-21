import { UserPhoto } from '../user/photo'
import { AuthTypes } from '../auth/token-input'


export interface SocialRegisterInput {
	email: string;
	firstName: string;
	lastName: string;
	password?: string | null;
	photo?: UserPhoto | null;
	type: AuthTypes;
}