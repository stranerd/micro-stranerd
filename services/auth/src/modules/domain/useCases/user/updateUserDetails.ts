import { BaseUseCase } from '@utils/commons'
import { RegisterInput } from '../../types'
import { IUserRepository } from '../../i-repositories/users'
import { AuthUserEntity } from '../../entities/users'

type Input = {
	userId: string,
	data: RegisterInput
}

export class UpdateUserDetailsUseCase implements BaseUseCase<Input, AuthUserEntity> {
	repository: IUserRepository

	constructor (repo: IUserRepository) {
		this.repository = repo
	}

	async execute (input: Input) {
		return await this.repository.updateDetails(input.userId, input.data)
	}
}