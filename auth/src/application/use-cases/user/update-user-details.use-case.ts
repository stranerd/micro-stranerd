import { BaseUseCase } from '@utils/commons'
import { RegisterInput, TokenInput } from '../../domain'
import { IUserRepository } from '../../contracts/repository'

export class UpdateUserDetailsUseCase implements BaseUseCase<RegisterInput, TokenInput> {
	repository: IUserRepository

	constructor (repo: IUserRepository) {
		this.repository = repo
	}

	async execute (credentials: RegisterInput): Promise<TokenInput> {

		return await this.repository.updateDetails(credentials)
	}

}