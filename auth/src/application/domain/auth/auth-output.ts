import { UserModel } from '../user/user'

export interface AuthOutput {
	accessToken: String;
	refreshToken: String;
	user: UserModel;
}