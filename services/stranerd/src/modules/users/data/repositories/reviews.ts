import { IReviewRepository } from '../../domain/i-repositories/reviews'
import { ReviewMapper } from '../mappers/reviews'
import { Review } from '../mongooseModels/reviews'
import { parseQueryParams, QueryParams } from '@utils/commons'
import { ReviewFromModel, ReviewToModel } from '../models/reviews'
import { UserBio } from '../../domain/types'

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

	async updateMyReviewsBio (userId: string, userBio: UserBio) {
		const res = await Review.updateMany({ userId }, { userBio })
		return !!res.acknowledged
	}
}