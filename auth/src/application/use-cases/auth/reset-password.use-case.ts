import { BaseUseCase } from '@utils/commons'
import { PasswordResetInput, TokenInput } from '../../domain'
import { IAuthRepository } from '../../contracts/repository'

export class ResetPasswordUseCase implements BaseUseCase<PasswordResetInput, TokenInput> {
	repository: IAuthRepository

	constructor (repo: IAuthRepository) {
		this.repository = repo
	}

	async execute (input: PasswordResetInput): Promise<TokenInput> {

		return await this.repository.resetPassword(input)
	}

}