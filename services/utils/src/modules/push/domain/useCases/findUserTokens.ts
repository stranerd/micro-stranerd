import { ITokenRepository } from '../irepositories/tokens'
import { TokenToModel } from '../../data/models/tokens'
import { AuthApps, BaseUseCase } from '@utils/commons'
import { TokenEntity } from '../entities/tokens'

type Input = { userId: string, app: AuthApps }

export class FindUserTokensUseCase extends BaseUseCase<TokenToModel, TokenEntity> {
	private repository: ITokenRepository

	constructor (repository: ITokenRepository) {
		super()
		this.repository = repository
	}

	async execute (data: Input) {
		return await this.repository.find(data.userId, data.app)
	}
}
