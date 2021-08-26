import { BaseUseCase } from '@utils/commons'
import { IUserRepository } from '../../i-repositories/users'

export class MarkUserAsDeletedUseCase implements BaseUseCase<string, void> {
	repository: IUserRepository

	constructor (repo: IUserRepository) {
		this.repository = repo
	}

	async execute (userId: string) {
		return await this.repository.markUserAsDeleted(userId)
	}
}