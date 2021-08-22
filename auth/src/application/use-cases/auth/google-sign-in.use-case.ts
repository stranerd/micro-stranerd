import { UseCase } from '../../base'
import { TokenInput } from '../../domain'
import { IAuthRepository } from '../../contracts/repository'

export class GoogleSignInUseCase implements UseCase<string, TokenInput> {
	repository: IAuthRepository

	constructor (repo: IAuthRepository) {
		this.repository = repo
	}

	async execute (idToken: string): Promise<TokenInput> {

		return await this.repository.googleSignIn(idToken)
	}

}