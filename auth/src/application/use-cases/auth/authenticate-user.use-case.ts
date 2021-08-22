import { UseCase } from '../../base'
import { AuthOutput, Credential, TokenInput } from '../../domain'
import { GenerateAuthOutputUseCase } from './generate-auth-output.use-case'
import { IAuthRepository } from '../../contracts/repository'
import { AuthTypes } from '@utils/commons'

export class AuthenticateUserUseCase implements UseCase<Credential, AuthOutput> {
	repository: IAuthRepository

	constructor (repo: IAuthRepository) {
		this.repository = repo
	}

	async execute (params: Credential): Promise<AuthOutput> {

		const TokenPayload: TokenInput = await this.repository.authenticateUser(params, true, AuthTypes.email)
		if (TokenPayload) {

			return new GenerateAuthOutputUseCase(this.repository).execute(TokenPayload)

		}

		return Promise.reject()
	}

}