/* eslint-disable no-unused-vars */
import { AuthOutput, Credential, TokenInput, Tokens, UserModel } from '../../domain'

export interface IAuthRepository {

	addNewUser (user: UserModel): Promise<TokenInput>;

	authenticateUser (details: Credential): Promise<TokenInput>;

	GetRefreshToken (tokens: Tokens): Promise<AuthOutput>;

	clearUserAuthCache (userId: string | null): Promise<boolean>;

	userTokenData (userId: string): Promise<TokenInput>;

}