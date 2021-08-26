import { BaseUseCase } from '@utils/commons'
import { IAuthRepository } from '../../contracts/repository'
import { AuthOutput, Tokens } from '../../domain'

export class RefreshTokenUseCase implements BaseUseCase<Tokens, AuthOutput> {
	repository: IAuthRepository

	constructor (repo: IAuthRepository) {
		this.repository = repo
	}

	async execute (tokens: Tokens): Promise<AuthOutput> {

		return await this.repository.GetRefreshToken(tokens)
	}

}