import { UseCase } from '../../base'
import { UserEntity } from '../../domain'
import { IUserRepository } from '../../contracts/repository'

export class GetUserDetailsUseCase implements UseCase<{ key: 'email' | 'id', value: string }, UserEntity | null> {
	repository: IUserRepository

	constructor (repo: IUserRepository) {
		this.repository = repo
	}

	async execute (data) {

		return await this.repository.userDetails(data.value, data.key)
	}

}