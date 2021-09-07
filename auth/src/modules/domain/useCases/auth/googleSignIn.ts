import { BaseUseCase } from '@utils/commons'
import { TokenInput } from '../../types'
import { IAuthRepository } from '../../i-repositories/auth'

export class GoogleSignInUseCase implements BaseUseCase<string, TokenInput> {
	repository: IAuthRepository

	constructor (repo: IAuthRepository) {
		this.repository = repo
	}

	async execute (idToken: string): Promise<TokenInput> {
		return await this.repository.googleSignIn(idToken)
	}
}