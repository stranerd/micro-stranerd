import { UseCase } from '../../base'
import { UserModel } from '../../domain'
import { IUserRepository } from '../../contracts/repository'

export class GetUserDetailsUseCase implements UseCase<string, UserModel> {
	repository: IUserRepository

	constructor (repo: IUserRepository) {
		this.repository = repo
	}

	async execute (userId: string): Promise<UserModel> {

		return await this.repository.userDetails(userId)
	}

}