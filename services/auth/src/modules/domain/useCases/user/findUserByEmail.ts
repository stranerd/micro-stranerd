import { BaseUseCase } from '@utils/commons'
import { AuthUserEntity } from '../../entities/users'
import { IUserRepository } from '../../i-repositories/users'

export class FindUserByEmailUseCase implements BaseUseCase<string, AuthUserEntity | null> {
	repository: IUserRepository

	constructor (repo: IUserRepository) {
		this.repository = repo
	}

	async execute (email: string) {
		const res = await this.repository.getUsers({
			where: [{ field: 'email', value: email.toLowerCase() }],
			limit: 1
		})
		return res.results[0] ?? null
	}
}