/* eslint-disable no-unused-vars */
import {
	AuthOutput,
	Credential,
	PasswordResetInput,
	PasswordUpdateInput,
	TokenInput,
	Tokens,
	UserModel
} from '../../domain'
import { AuthTypes } from '@utils/commons'

export interface IAuthRepository {

	addNewUser (user: UserModel, type: AuthTypes): Promise<TokenInput>;

	authenticateUser (details: Credential, passwordValidate: boolean, type: AuthTypes): Promise<TokenInput>;

	GetRefreshToken (tokens: Tokens): Promise<AuthOutput>;

	clearUserAuthCache (userId: string | null): Promise<boolean>;

	userTokenData (userId: string): Promise<TokenInput>;

	sendVerificationMail (email: string): Promise<boolean>;

	verifyEmail (token: string): Promise<TokenInput>;

	sendPasswordResetMail (email: string): Promise<boolean>;

	resetPassword (input: PasswordResetInput): Promise<TokenInput>;

	updatePassword (input: PasswordUpdateInput): Promise<boolean>;

	googleSignIn (tokenId: string): Promise<TokenInput>;
}