import { ReviewsUseCases, UsersUseCases } from '@modules/users'
import { BadRequestError, QueryParams, Request, validate, Validation } from '@utils/app/package'

export class ReviewsController {
	static async getReviews (req: Request) {
		return await ReviewsUseCases.get(req.query as QueryParams)
	}

	static async findReview (req: Request) {
		return await ReviewsUseCases.find(req.params.id)
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
			tutorId: { required: true, rules: [Validation.isString] }
		})

		const user = await UsersUseCases.find(req.authUser!.id)
		if (!user) throw new BadRequestError('user not found')

		return await ReviewsUseCases.create({ ...data, user: user.getEmbedded() })
	}
}