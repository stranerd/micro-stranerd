import { BaseUseCase } from '@utils/commons'
import { IUserRepository } from '../../i-repositories/users'
import { UserAccount } from '@modules/users/domain/types'

export class ResetRankingsUseCase implements BaseUseCase<keyof UserAccount['rankings'], boolean> {
	repository: IUserRepository

	constructor (repo: IUserRepository) {
		this.repository = repo
	}

	async execute (key: keyof UserAccount['rankings']) {
		return await this.repository.resetRankings(key)
	}
}