import { Credential, PasswordResetInput, TokenInput } from '../types'
import { AuthTypes } from '@utils/commons'
import { UserToModel } from '../../data/models/users'

export interface IAuthRepository {
	addNewUser (user: UserToModel, type: AuthTypes): Promise<TokenInput>

	authenticateUser (details: Credential, passwordValidate: boolean, type: AuthTypes): Promise<TokenInput>

	userTokenData (userId: string): Promise<TokenInput>

	sendVerificationMail (email: string): Promise<boolean>

	verifyEmail (token: string): Promise<TokenInput>

	sendPasswordResetMail (email: string): Promise<boolean>

	resetPassword (input: PasswordResetInput): Promise<TokenInput>

	googleSignIn (tokenId: string): Promise<TokenInput>
}