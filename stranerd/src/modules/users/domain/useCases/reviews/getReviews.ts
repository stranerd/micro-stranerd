import { BaseUseCase, QueryParams, QueryResults } from '@utils/commons'
import { ReviewEntity } from '../../entities/reviews'
import { IReviewRepository } from '../../i-repositories/reviews'

export class GetReviewsUseCase implements BaseUseCase<QueryParams, QueryResults<ReviewEntity>> {
	repository: IReviewRepository

	constructor (repo: IReviewRepository) {
		this.repository = repo
	}

	async execute (input) {
		return await this.repository.getReviews(input)
	}
}