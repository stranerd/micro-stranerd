import { BaseMapper } from '@utils/commons'
import { ReviewEntity } from '../../domain/entities/reviews'
import { ReviewFromModel, ReviewToModel } from '../models/reviews'

export class ReviewMapper extends BaseMapper<ReviewFromModel, ReviewToModel, ReviewEntity> {
	mapFrom (param: ReviewFromModel | null) {
		return !param ? null : new ReviewEntity({
			id: param._id.toString(),
			review: param.review,
			rating: param.rating,
			tutorId: param.tutorId,
			userId: param.userId,
			userBio: param.userBio,
			userRoles: param.userRoles,
			createdAt: param.createdAt,
			updatedAt: param.updatedAt
		})
	}

	mapTo (param: ReviewEntity) {
		return {
			review: param.review,
			rating: param.rating,
			tutorId: param.tutorId,
			userId: param.userId,
			userBio: param.userBio,
			userRoles: param.userRoles
		}
	}
}