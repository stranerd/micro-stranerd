import { BaseUseCase, QueryParams, QueryResults } from '@utils/commons'
import { AuthUserEntity } from '../../entities/users'
import { IUserRepository } from '../../i-repositories/users'

export class GetUsersUseCase implements BaseUseCase<QueryParams, QueryResults<AuthUserEntity>> {
	repository: IUserRepository

	constructor (repo: IUserRepository) {
		this.repository = repo
	}

	async execute (data: QueryParams) {
		return await this.repository.getUsers(data)
	}
}