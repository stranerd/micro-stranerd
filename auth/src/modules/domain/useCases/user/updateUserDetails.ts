import { BaseUseCase } from '@utils/commons'
import { RegisterInput, TokenInput } from '../../types'
import { IUserRepository } from '../../i-repositories/users'

type Input = {
	userId: string,
	data: RegisterInput
}

export class UpdateUserDetailsUseCase implements BaseUseCase<Input, TokenInput> {
	repository: IUserRepository

	constructor (repo: IUserRepository) {
		this.repository = repo
	}

	async execute (input: Input): Promise<TokenInput> {
		return await this.repository.updateDetails(input.userId, input.data)
	}
}