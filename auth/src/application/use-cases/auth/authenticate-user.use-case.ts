import { UseCase } from '../../base'
import { AuthOutput, Credential, TokenInput } from '../../domain'
import { GenerateAuthOutputUseCase } from './generate-auth-output.use-case'
import { IUserRepository } from '../../contracts/repository'

export class AuthenticateUserUseCase implements UseCase<Credential, AuthOutput> {
	repository

	constructor (repo: IUserRepository) {
		this.repository = repo
	}

	async execute (params: Credential): Promise<AuthOutput> {
		const TokenPayload: TokenInput = await this.repository.authenticateUser(params)
		if (TokenPayload) {

			const response = new GenerateAuthOutputUseCase(this.repository).execute(TokenPayload)

			return new Promise((resolve) => resolve(response))

		}

		return new Promise((res, reject) => reject())
	}

}