import { QueryParams } from '@utils/commons'
import { IReviewRepository } from '../irepositories/reviews'
import { ReviewToModel } from '../../data/models/reviews'
import { EmbeddedUser } from '../types'

export class ReviewsUseCase {
	repository: IReviewRepository

	constructor (repo: IReviewRepository) {
		this.repository = repo
	}

	async create (input: ReviewToModel) {
		return await this.repository.createReview(input)
	}

	async find (input: string) {
		return await this.repository.findReview(input)
	}

	async get (input: QueryParams) {
		return await this.repository.getReviews(input)
	}

	async updateUserBio (user: EmbeddedUser) {
		return await this.repository.updateReviewsUserBio(user)
	}
}