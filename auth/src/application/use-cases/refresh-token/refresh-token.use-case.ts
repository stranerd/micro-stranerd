import { UseCase } from '../../base'
import { IUserRepository } from '../../contracts/repository'
import { AuthOutput, Tokens } from '../../domain'

export class RefreshTokenUseCase implements UseCase<Tokens, AuthOutput> {
	repository: IUserRepository

	constructor (repo: IUserRepository) {
		this.repository = repo
	}

	async execute (tokens: Tokens): Promise<AuthOutput> {

		const TokenPayload: AuthOutput = await this.repository.GetRefreshToken(tokens)

		if (TokenPayload) {

			return new Promise((resolve) => resolve(TokenPayload))

		}

		return new Promise((resolve, reject) => reject())

	}

}