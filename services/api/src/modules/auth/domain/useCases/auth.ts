import { AuthTypes } from '@utils/app/package'
import { Credential, PasswordResetInput, Phone, RegisterInput } from '../types'
import { IAuthRepository } from '../irepositories/auth'
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

	async appleSignIn (input: { data: { idToken: string, email: string | null, firstName: string | null, lastName: string | null }, referrer: string | null }) {
		return await this.repository.appleSignIn(input.data, input.referrer)
	}

	async registerUser (params: RegisterInput) {
		const userModel: UserToModel = {
			firstName: params.firstName,
			lastName: params.lastName,
			password: params.password,
			email: params.email,
			description: params.description,
			photo: params.photo,
			phone: null,
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

	async sendVerificationText (data: { id: string, phone: Phone }) {
		return await this.repository.sendVerificationText(data.id, data.phone)
	}

	async verifyPhone (token: string) {
		return await this.repository.verifyPhone(token)
	}
}