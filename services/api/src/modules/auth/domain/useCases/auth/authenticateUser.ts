import { AuthTypes, BaseUseCase } from '@utils/commons'
import { Credential } from '../../types'
import { IAuthRepository } from '../../i-repositories/auth'
import { AuthUserEntity } from '../../entities/users'

export class AuthenticateUserUseCase implements BaseUseCase<Credential, AuthUserEntity> {
	repository: IAuthRepository

	constructor (repo: IAuthRepository) {
		this.repository = repo
	}

	async execute (params: Credential) {
		return await this.repository.authenticateUser(params, true, AuthTypes.email)
	}
}