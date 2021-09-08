import { BaseUseCase } from '@utils/commons'
import { TokenInput } from '../../types'
import { IAuthRepository } from '../../i-repositories/auth'

type Input = {
	idToken: string
	referrer: string | null
}

export class GoogleSignInUseCase implements BaseUseCase<Input, TokenInput> {
	repository: IAuthRepository

	constructor (repo: IAuthRepository) {
		this.repository = repo
	}

	async execute (input: Input): Promise<TokenInput> {
		return await this.repository.googleSignIn(input.idToken, input.referrer)
	}
}