import { UseCase } from '../../base'
import { UserEntity } from '../../domain'
import { IUserRepository } from '../../contracts/repository'

export class GetUserDetailsUseCase implements UseCase<string, UserEntity> {
	repository: IUserRepository

	constructor (repo: IUserRepository) {
		this.repository = repo
	}

	async execute (userId: string): Promise<UserEntity> {

		return await this.repository.userDetails(userId)
	}

}