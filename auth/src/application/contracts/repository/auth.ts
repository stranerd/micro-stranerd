import { AuthOutput, Credential, PasswordResetInput, PasswordUpdateInput, TokenInput, Tokens } from '../../domain'
import { AuthTypes } from '@utils/commons'
import { UserToModel } from '../../../repository/models'

export interface IAuthRepository {

	addNewUser (user: UserToModel, type: AuthTypes): Promise<TokenInput>;

	authenticateUser (details: Credential, passwordValidate: boolean, type: AuthTypes): Promise<TokenInput>;

	GetRefreshToken (tokens: Tokens): Promise<AuthOutput>;

	clearUserAuthCache (userId: string): Promise<boolean>;

	userTokenData (userId: string): Promise<TokenInput>;

	sendVerificationMail (email: string): Promise<boolean>;

	verifyEmail (token: string): Promise<TokenInput>;

	sendPasswordResetMail (email: string): Promise<boolean>;

	resetPassword (input: PasswordResetInput): Promise<TokenInput>;

	updatePassword (input: PasswordUpdateInput): Promise<boolean>;

	googleSignIn (tokenId: string): Promise<TokenInput>;
}