import { UseCase } from '../../base'
import { AuthOutput, TokenInput } from '../../domain'
import { IAuthRepository } from '../../contracts/repository'
import { GenerateAuthOutputUseCase } from './generate-auth-output.use-case'

export class GoogleSignInUseCase implements UseCase<string, AuthOutput> {
	repository: IAuthRepository

	constructor (repo: IAuthRepository) {
		this.repository = repo
	}

	async execute (idToken: string): Promise<AuthOutput> {

		const TokenPayload: TokenInput = await this.repository.googleSignIn(idToken)

		if (TokenPayload) {

			return new GenerateAuthOutputUseCase(this.repository).execute(TokenPayload)

		}

		return Promise.reject()

	}

}