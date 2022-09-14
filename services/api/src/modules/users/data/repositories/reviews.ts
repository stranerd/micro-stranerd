import { IReviewRepository } from '../../domain/irepositories/reviews'
import { ReviewMapper } from '../mappers/reviews'
import { Review } from '../mongooseModels/reviews'
import { parseQueryParams, QueryParams } from '@utils/app/package'
import { ReviewFromModel, ReviewToModel } from '../models/reviews'
import { EmbeddedUser } from '../../domain/types'

export class ReviewRepository implements IReviewRepository {
	private static instance: ReviewRepository
	private mapper = new ReviewMapper()

	static getInstance (): ReviewRepository {
		if (!ReviewRepository.instance) ReviewRepository.instance = new ReviewRepository()
		return ReviewRepository.instance
	}

	async getReviews (query: QueryParams) {
		const data = await parseQueryParams<ReviewFromModel>(Review, query)
		return {
			...data,
			results: data.results.map((n) => this.mapper.mapFrom(n)!)
		}
	}

	async findReview (id: string) {
		const review = await Review.findOne({ _id: id })
		return this.mapper.mapFrom(review)
	}

	async createReview (data: ReviewToModel) {
		const review = await new Review(data).save()
		return this.mapper.mapFrom(review)!
	}

	async updateReviewsUserBio (user: EmbeddedUser) {
		const res = await Review.updateMany({ 'user.id': user.id }, { $set: { user } })
		return !!res.acknowledged
	}
}