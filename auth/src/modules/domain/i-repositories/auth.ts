import { Credential, PasswordResetInput } from '../types'
import { AuthTypes } from '@utils/commons'
import { UserToModel } from '../../data/models/users'
import { UserEntity } from '../entities/users'

export interface IAuthRepository {
	addNewUser (user: UserToModel, type: AuthTypes): Promise<UserEntity>

	authenticateUser (details: Credential, passwordValidate: boolean, type: AuthTypes): Promise<UserEntity>

	userTokenData (userId: string): Promise<UserEntity>

	sendVerificationMail (email: string): Promise<boolean>

	verifyEmail (token: string): Promise<UserEntity>

	sendPasswordResetMail (email: string): Promise<boolean>

	resetPassword (input: PasswordResetInput): Promise<UserEntity>

	googleSignIn (tokenId: string, referrer: string | null): Promise<UserEntity>
}