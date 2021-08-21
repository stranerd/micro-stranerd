/* eslint-disable no-unused-vars */
import { AuthOutput, Credential, TokenInput, Tokens, UserModel, PasswordResetInput, PasswordUpdateInput } from '../../domain'

export interface IAuthRepository {

	addNewUser (user: UserModel): Promise<TokenInput>;

	authenticateUser (details: Credential,passwordValidate: boolean): Promise<TokenInput>;

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