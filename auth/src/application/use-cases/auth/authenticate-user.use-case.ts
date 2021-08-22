import { UseCase } from '../../base'
import { Credential, TokenInput } from '../../domain'
import { IAuthRepository } from '../../contracts/repository'
import { AuthTypes } from '@utils/commons'

export class AuthenticateUserUseCase implements UseCase<Credential, TokenInput> {
	repository: IAuthRepository

	constructor (repo: IAuthRepository) {
		this.repository = repo
	}

	async execute (params: Credential): Promise<TokenInput> {
		return await this.repository.authenticateUser(params, true, AuthTypes.email)
	}

}