import { BaseUseCase } from '@utils/commons'
import { IReviewRepository } from '../../i-repositories/reviews'
import { UserBio, UserRoles } from '../../types'

type Input = { userId: string, userBio: UserBio, userRoles: UserRoles }

export class UpdateReviewsUserBioUseCase implements BaseUseCase<Input, boolean> {
	repository: IReviewRepository

	constructor (repo: IReviewRepository) {
		this.repository = repo
	}

	async execute (input: Input) {
		return await this.repository.updateReviewsUserBio(input.userId, input.userBio, input.userRoles)
	}
}