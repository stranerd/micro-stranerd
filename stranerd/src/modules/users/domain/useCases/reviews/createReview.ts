import { BaseUseCase } from '@utils/commons'
import { IReviewRepository } from '../../i-repositories/reviews'
import { ReviewToModel } from '../../../data/models/reviews'
import { ReviewEntity } from '../../entities/reviews'

export class CreateReviewUseCase implements BaseUseCase<ReviewToModel, ReviewEntity | null> {
	repository: IReviewRepository

	constructor (repo: IReviewRepository) {
		this.repository = repo
	}

	async execute (input) {
		return await this.repository.createReview(input)
	}
}