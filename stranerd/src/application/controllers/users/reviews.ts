import { CreateReview, FindReview, FindUser, GetReviews } from '@modules/users'
import { QueryParams, Request, validate, Validation } from '@utils/commons'

export class ReviewsController {
	static async getReviews (req: Request) {
		return await GetReviews.execute(req.body as QueryParams)
	}

	static async findReview (req: Request) {
		return await FindReview.execute(req.params.id)
	}

	static async createReview (req: Request) {
		const data = validate({
			rating: req.body.rating,
			review: req.body.review,
			tutorId: req.body.tutorId
		}, {
			rating: {
				required: true,
				rules: [Validation.isNumber, Validation.isMoreThanX(0), Validation.isLessThanX(5.1)]
			},
			review: { required: true, rules: [Validation.isString] },
			tutorId: { required: true, rules: [Validation.isValidMongooseId] }
		})

		const user = await FindUser.execute(req.authUser!.id)

		return await CreateReview.execute({
			...data,
			userBio: user!.bio,
			userId: req.authUser!.id
		})
	}
}