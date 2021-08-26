import { BaseUseCase } from '@utils/commons'
import { SuccessStatus, UserUpdateInput } from '../../domain'
import { IUserRepository } from '../../contracts/repository'

export class UpdateUserProfileUseCase implements BaseUseCase<UserUpdateInput, SuccessStatus> {
	repository: IUserRepository

	constructor (repo: IUserRepository) {
		this.repository = repo
	}

	async execute (input: UserUpdateInput): Promise<SuccessStatus> {

		const updated: boolean = await this.repository.updateUserProfile(input)

		return {
			success: updated
		}

	}

}