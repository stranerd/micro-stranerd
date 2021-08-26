import { UseCase } from '@utils/commons'
import { UserEntity } from '../../entities/users'
import { IUserRepository } from '../../i-repositories/users'

export class FindUserUseCase implements UseCase<string, UserEntity | null> {
	repository: IUserRepository

	constructor (repo: IUserRepository) {
		this.repository = repo
	}

	async execute (id) {
		return await this.repository.findUser(id)
	}
}