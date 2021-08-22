import { UseCase } from '../../base'
import { PasswordResetInput, TokenInput } from '../../domain'
import { IAuthRepository } from '../../contracts/repository'

export class ResetPasswordUseCase implements UseCase<PasswordResetInput, TokenInput> {
	repository: IAuthRepository

	constructor (repo: IAuthRepository) {
		this.repository = repo
	}

	async execute (input: PasswordResetInput): Promise<TokenInput> {

		return await this.repository.resetPassword(input)
	}

}