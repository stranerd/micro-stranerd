import { AuthTypes, BaseUseCase } from '@utils/commons'
import { Credential, TokenInput } from '../../domain'
import { IAuthRepository } from '../../contracts/repository'

export class AuthenticateUserUseCase implements BaseUseCase<Credential, TokenInput> {
	repository: IAuthRepository

	constructor (repo: IAuthRepository) {
		this.repository = repo
	}

	async execute (params: Credential): Promise<TokenInput> {
		return await this.repository.authenticateUser(params, true, AuthTypes.email)
	}

}