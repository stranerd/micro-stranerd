/* eslint-disable no-unused-vars */
import { UserModel, Credential, TokenInput, Tokens, AuthOutput, RoleInput } from '../../domain'

export interface IUserRepository {
    addNewUser(user: UserModel): Promise<TokenInput>;
    authenticateUser(details: Credential): Promise<TokenInput>;
	userDetails(userId: string): Promise<UserModel>;
	GetRefreshToken(tokens: Tokens): Promise<AuthOutput>;
	clearUserAuthCache(userId: string | null): Promise<boolean>;
	updateUserRole(roleInput: RoleInput): Promise<boolean>;
}