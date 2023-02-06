import { Credential, PasswordResetInput, Phone } from '../types'
import { AuthTypes, Enum } from '@utils/app/package'
import { UserToModel } from '../../data/models/users'
import { AuthUserEntity } from '../entities/users'

export interface IAuthRepository {
	addNewUser (user: UserToModel, type: Enum<typeof AuthTypes>): Promise<AuthUserEntity>

	authenticateUser (details: Credential, passwordValidate: boolean, type: Enum<typeof AuthTypes>): Promise<AuthUserEntity>

	sendVerificationMail (email: string): Promise<boolean>

	verifyEmail (token: string): Promise<AuthUserEntity>

	sendVerificationText (id: string, phone: Phone): Promise<boolean>

	verifyPhone (token: string): Promise<AuthUserEntity>

	sendPasswordResetMail (email: string): Promise<boolean>

	resetPassword (input: PasswordResetInput): Promise<AuthUserEntity>

	googleSignIn (tokenId: string, referrer: string | null): Promise<AuthUserEntity>

	appleSignIn (data: { idToken: string, email: string | null, firstName: string | null, lastName: string | null }, referrer: string | null): Promise<AuthUserEntity>
}