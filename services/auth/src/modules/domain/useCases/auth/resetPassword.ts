import { BaseUseCase } from '@utils/commons'
import { PasswordResetInput } from '../../types'
import { IAuthRepository } from '../../i-repositories/auth'
import { AuthUserEntity } from '../../entities/users'

export class ResetPasswordUseCase implements BaseUseCase<PasswordResetInput, AuthUserEntity> {
	repository: IAuthRepository

	constructor (repo: IAuthRepository) {
		this.repository = repo
	}

	async execute (input: PasswordResetInput) {
		return await this.repository.resetPassword(input)
	}
}