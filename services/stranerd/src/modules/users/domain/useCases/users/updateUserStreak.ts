import { BaseUseCase } from '@utils/commons'
import { IUserRepository } from '../../i-repositories/users'

export class UpdateUserStreakUseCase implements BaseUseCase<string, { skip: boolean, increase: boolean, reset: boolean, streak: number }> {
	repository: IUserRepository

	constructor (repo: IUserRepository) {
		this.repository = repo
	}

	async execute (id: string) {
		return await this.repository.updateUserStreak(id)
	}
}