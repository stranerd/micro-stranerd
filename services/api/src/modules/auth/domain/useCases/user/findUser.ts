import { BaseUseCase } from '@utils/commons'
import { AuthUserEntity } from '../../entities/users'
import { IUserRepository } from '../../i-repositories/users'

export class FindUserUseCase implements BaseUseCase<string, AuthUserEntity | null> {
	repository: IUserRepository

	constructor (repo: IUserRepository) {
		this.repository = repo
	}

	async execute (id: string) {
		return await this.repository.findUser(id)
	}
}