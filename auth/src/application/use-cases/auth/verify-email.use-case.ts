import { UseCase } from '../../base'
import { TokenInput } from '../../domain'
import { IAuthRepository } from '../../contracts/repository'

export class VerifyEmailUseCase implements UseCase<string, TokenInput> {
	repository: IAuthRepository

	constructor (repo: IAuthRepository) {
		this.repository = repo
	}

	async execute (token: string): Promise<TokenInput> {
		return await this.repository.verifyEmail(token)
	}

}