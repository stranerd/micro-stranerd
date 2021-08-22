import { UseCase } from '../../base'
import { AuthOutput, SocialRegisterInput, TokenInput } from '../../domain'
import { IUserRepository } from '../../contracts/repository'
import { GenerateAuthOutputUseCase } from '../auth/generate-auth-output.use-case'

export class UpdateUserDetailsUseCase implements UseCase<SocialRegisterInput, AuthOutput> {
	repository: IUserRepository

	constructor (repo: IUserRepository) {
		this.repository = repo
	}

	async execute (credentials: SocialRegisterInput): Promise<AuthOutput> {

		const result: TokenInput = await this.repository.updateDetails(credentials)

		if (result) {

			return new GenerateAuthOutputUseCase(this.repository).execute(result)
		}

		return Promise.reject()
	}

}