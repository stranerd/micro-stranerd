import { UseCase } from '../../base'
import { TokenInput, AuthOutput } from '../../domain'
import { IAuthRepository } from '../../contracts/repository'
import { GenerateAuthOutputUseCase } from './generate-auth-output.use-case'

export class GoogleSignInUseCase implements UseCase<string, AuthOutput> {
	repository

	constructor (repo: IAuthRepository) {
		this.repository = repo
	}

	async execute (Idtoken: string ): Promise<AuthOutput> {

		const TokenPayload: TokenInput = await this.repository.googleSignIn(Idtoken)

		if (TokenPayload) {

			return new GenerateAuthOutputUseCase(this.repository).execute(TokenPayload)

		}

		return Promise.reject()

	}

}