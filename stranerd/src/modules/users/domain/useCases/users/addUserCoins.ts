import { BaseUseCase } from '@utils/commons'
import { UserEntity } from '../../entities/users'
import { IUserRepository } from '../../i-repositories/users'

type Input = {
	id: string,
	coins: {
		gold: number
		bronze: number
	}
}

export class AddUserCoinsUseCase implements BaseUseCase<Input, UserEntity | null> {
	repository: IUserRepository

	constructor (repo: IUserRepository) {
		this.repository = repo
	}

	async execute (params: Input) {
		return await this.repository.addUserCoins(params.id, params.coins)
	}
}