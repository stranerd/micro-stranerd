import { BaseUseCase } from '@utils/commons'
import { IUserRepository } from '../../i-repositories/users'

type Input = { userId: string, ratings: number, add: boolean }

export class UpdateUserRatingsUseCase implements BaseUseCase<Input, boolean> {
	repository: IUserRepository

	constructor (repo: IUserRepository) {
		this.repository = repo
	}

	async execute (input: Input) {
		return await this.repository.updateUserRatings(input.userId, input.ratings, input.add)
	}
}