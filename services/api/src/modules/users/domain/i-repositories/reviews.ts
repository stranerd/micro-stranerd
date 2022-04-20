import { ReviewEntity } from '../entities/reviews'
import { ReviewToModel } from '../../data/models/reviews'
import { QueryParams, QueryResults } from '@utils/commons'
import { UserBio, UserRoles } from '../types'

export interface IReviewRepository {
	findReview (data: string): Promise<ReviewEntity | null>

	createReview (data: ReviewToModel): Promise<ReviewEntity>

	getReviews (query: QueryParams): Promise<QueryResults<ReviewEntity>>

	updateReviewsUserBio (userId: string, userBio: UserBio, userRoles: UserRoles): Promise<boolean>
}