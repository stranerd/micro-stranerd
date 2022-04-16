import { BaseUseCase } from '@utils/commons'
import { IAuthRepository } from '../../i-repositories/auth'
import { AuthUserEntity } from '../../entities/users'

type Input = {
	idToken: string
	referrer: string | null
}

export class GoogleSignInUseCase implements BaseUseCase<Input, AuthUserEntity> {
	repository: IAuthRepository

	constructor (repo: IAuthRepository) {
		this.repository = repo
	}

	async execute (input: Input) {
		return await this.repository.googleSignIn(input.idToken, input.referrer)
	}
}