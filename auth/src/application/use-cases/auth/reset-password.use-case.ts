import { UseCase } from '../../base'
import { AuthOutput, PasswordResetInput, TokenInput } from '../../domain'
import { IAuthRepository } from '../../contracts/repository'
import { GenerateAuthOutputUseCase } from './generate-auth-output.use-case'

export class ResetPasswordUseCase implements UseCase<PasswordResetInput, AuthOutput> {
	repository: IAuthRepository

	constructor (repo: IAuthRepository) {
		this.repository = repo
	}

	async execute (input: PasswordResetInput): Promise<AuthOutput> {

		const TokenPayload: TokenInput = await this.repository.resetPassword(input)

		if (TokenPayload) {

			return new GenerateAuthOutputUseCase(this.repository).execute(TokenPayload)

		}

		return Promise.reject()
	}

}