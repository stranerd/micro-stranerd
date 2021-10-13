import { BaseUseCase } from '@utils/commons'
import { IUserRepository } from '../../i-repositories/users'

type Input = { userId: string, tags: string[], add: boolean }

export class UpdateUserTagsUseCase implements BaseUseCase<Input, boolean> {
	repository: IUserRepository

	constructor (repo: IUserRepository) {
		this.repository = repo
	}

	async execute (input: Input) {
		return await this.repository.updateUserTags(input.userId, input.tags, input.add)
	}
}