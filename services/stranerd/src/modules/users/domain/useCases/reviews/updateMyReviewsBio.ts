import { BaseUseCase } from '@utils/commons'
import { IReviewRepository } from '../../i-repositories/reviews'
import { UserBio } from '../../types'

type Input = { userId: string, userBio: UserBio }

export class UpdateMyReviewsBioUseCase implements BaseUseCase<Input, boolean> {
	repository: IReviewRepository

	constructor (repo: IReviewRepository) {
		this.repository = repo
	}

	async execute (input: Input) {
		return await this.repository.updateMyReviewsBio(input.userId, input.userBio)
	}
}