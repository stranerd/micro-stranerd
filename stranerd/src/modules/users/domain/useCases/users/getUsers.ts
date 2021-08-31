import { BaseUseCase, QueryParams, QueryResults } from '@utils/commons'
import { UserEntity } from '../../entities/users'
import { IUserRepository } from '../../i-repositories/users'

export class GetUsersUseCase implements BaseUseCase<QueryParams, QueryResults<UserEntity>> {
	repository: IUserRepository

	constructor (repo: IUserRepository) {
		this.repository = repo
	}

	async execute (query: QueryParams) {
		return await this.repository.getUsers(query)
	}
}