import { AuthTypes } from '@utils/commons'
import { Credential, PasswordResetInput, RegisterInput } from '../types'
import { IAuthRepository } from '../i-repositories/auth'
import { UserToModel } from '../../data/models/users'

export class AuthUseCase {
	repository: IAuthRepository

	constructor (repo: IAuthRepository) {
		this.repository = repo
	}

	async authenticateUser (params: Credential) {
		return await this.repository.authenticateUser(params, true, AuthTypes.email)
	}

	async googleSignIn (input: { idToken: string, referrer: string | null }) {
		return await this.repository.googleSignIn(input.idToken, input.referrer)
	}

	async registerUser (params: RegisterInput) {
		const userModel: UserToModel = {
			firstName: params.firstName,
			lastName: params.lastName,
			password: params.password,
			email: params.email,
			description: params.description,
			photo: params.photo,
			referrer: params.referrer,
			isVerified: false,
			authTypes: [AuthTypes.email]
		}

		return await this.repository.addNewUser(userModel, AuthTypes.email)
	}

	async resetPassword (input: PasswordResetInput) {
		return await this.repository.resetPassword(input)
	}

	async sendPasswordResetMail (email: string) {
		return await this.repository.sendPasswordResetMail(email)
	}

	async sendVerificationMail (email: string) {
		return await this.repository.sendVerificationMail(email)
	}

	async verifyEmail (token: string) {
		return await this.repository.verifyEmail(token)
	}
}