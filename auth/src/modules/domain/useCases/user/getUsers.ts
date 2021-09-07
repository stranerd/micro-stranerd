import { BaseUseCase } from '@utils/commons'
import { UserEntity } from '../../entities/users'
import { IUserRepository } from '../../i-repositories/users'
import { QueryParams, QueryResults } from '@stranerd/api-commons'

export class GetUsersUseCase implements BaseUseCase<QueryParams, QueryResults<UserEntity>> {
	repository: IUserRepository

	constructor (repo: IUserRepository) {
		this.repository = repo
	}

	async execute (data: QueryParams) {
		return await this.repository.getUsers(data)
	}
}