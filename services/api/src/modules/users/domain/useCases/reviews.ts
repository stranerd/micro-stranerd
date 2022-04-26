import { QueryParams } from '@utils/commons'
import { IReviewRepository } from '../i-repositories/reviews'
import { ReviewToModel } from '../../data/models/reviews'
import { UserBio, UserRoles } from '../types'

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

	async updateUserBio (input: { userId: string, userBio: UserBio, userRoles: UserRoles }) {
		return await this.repository.updateReviewsUserBio(input.userId, input.userBio, input.userRoles)
	}
}