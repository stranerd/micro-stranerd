import { BaseUseCase } from '@utils/commons'
import { UserEntity } from '../../domain'
import { IUserRepository } from '../../contracts/repository'

export class GetUserDetailsUseCase implements BaseUseCase<{ key: 'email' | 'id', value: string }, UserEntity | null> {
	repository: IUserRepository

	constructor (repo: IUserRepository) {
		this.repository = repo
	}

	async execute (data) {

		return await this.repository.userDetails(data.value, data.key)
	}

}