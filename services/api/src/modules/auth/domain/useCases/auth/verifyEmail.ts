import { BaseUseCase } from '@utils/commons'
import { IAuthRepository } from '../../i-repositories/auth'
import { AuthUserEntity } from '../../entities/users'

export class VerifyEmailUseCase implements BaseUseCase<string, AuthUserEntity> {
	repository: IAuthRepository

	constructor (repo: IAuthRepository) {
		this.repository = repo
	}

	async execute (token: string) {
		return await this.repository.verifyEmail(token)
	}
}