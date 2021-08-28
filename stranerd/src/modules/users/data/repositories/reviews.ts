import { IReviewRepository } from '../../domain/i-repositories/reviews'
import { ReviewMapper } from '../mappers/reviews'
import { Review } from '../mongooseModels/reviews'
import { mongoose, parseQueryParams, QueryParams } from '@utils/commons'
import { ReviewFromModel, ReviewToModel } from '../models/reviews'

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
		if (!mongoose.Types.ObjectId.isValid(id)) return null
		const review = await Review.findOne({ _id: id })
		return this.mapper.mapFrom(review)
	}

	async createReview (data: ReviewToModel) {
		if (!mongoose.Types.ObjectId.isValid(data.userId)) return null
		const review = await new Review(data).save()
		return this.mapper.mapFrom(review)
	}
}