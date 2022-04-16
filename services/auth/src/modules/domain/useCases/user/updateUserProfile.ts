import { BaseUseCase } from '@utils/commons'
import { UserUpdateInput } from '../../types'
import { IUserRepository } from '../../i-repositories/users'
import { AuthUserEntity } from '../../entities/users'

type Input = {
	userId: string,
	data: UserUpdateInput
}

export class UpdateUserProfileUseCase implements BaseUseCase<Input, AuthUserEntity> {
	repository: IUserRepository

	constructor (repo: IUserRepository) {
		this.repository = repo
	}

	async execute (input: Input) {
		return await this.repository.updateUserProfile(input.userId, input.data)
	}
}