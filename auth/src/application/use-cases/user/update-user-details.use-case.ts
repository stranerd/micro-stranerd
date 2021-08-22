import { UseCase } from '../../base'
import { SocialRegisterInput, TokenInput } from '../../domain'
import { IUserRepository } from '../../contracts/repository'

export class UpdateUserDetailsUseCase implements UseCase<SocialRegisterInput, TokenInput> {
	repository: IUserRepository

	constructor (repo: IUserRepository) {
		this.repository = repo
	}

	async execute (credentials: SocialRegisterInput): Promise<TokenInput> {

		return await this.repository.updateDetails(credentials)
	}

}