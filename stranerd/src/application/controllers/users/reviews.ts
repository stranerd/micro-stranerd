import { CreateReview, FindReview, FindUser, GetReviews } from '@modules/users'
import { Request, validate, Validation } from '@utils/commons'
import { QueryParams } from '@stranerd/api-commons'
import { UserBio } from '@modules/users/domain/types/users'

export class ReviewsController {
	static async getReviews (req: Request) {
		return await GetReviews.execute(req.body as QueryParams)
	}

	static async findReview (req: Request) {
		return await FindReview.execute(req.params.id)
	}

	static async createReview (req: Request) {
		const isMoreThan0 = (val: number) => Validation.isMoreThan(val, 0)
		const isLessThan5 = (val: number) => Validation.isLessThan(val, 5.1)
		const data = validate({
			rating: req.body.rating,
			review: req.body.review,
			tutorId: req.body.tutorId
		}, {
			rating: { required: true, rules: [isMoreThan0, isLessThan5] },
			review: { required: true, rules: [] },
			tutorId: { required: true, rules: [] }
		})

		const user = await FindUser.execute(req.body.id)

		return await CreateReview.execute({
			...data,
			userBio: user?.bio ?? {} as UserBio,
			userId: req.authUser!.id
		})
	}
}