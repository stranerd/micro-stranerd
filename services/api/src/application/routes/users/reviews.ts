import { makeController, requireAuthUser, Route, StatusCodes } from '@utils/app/package'
import { ReviewsController } from '../../controllers/users/reviews'

export const reviewsRoutes: Route[] = [
	{
		path: '/users/reviews/',
		method: 'get',
		controllers: [
			requireAuthUser,
			makeController(async (req) => {
				return {
					status: StatusCodes.Ok,
					result: await ReviewsController.getReviews(req)
				}
			})
		]
	},
	{
		path: '/users/reviews/:id',
		method: 'get',
		controllers: [
			makeController(async (req) => {
				return {
					status: StatusCodes.Ok,
					result: await ReviewsController.findReview(req)
				}
			})
		]
	},
	{
		path: '/users/reviews/',
		method: 'post',
		controllers: [
			requireAuthUser,
			makeController(async (req) => {
				return {
					status: StatusCodes.Ok,
					result: await ReviewsController.createReview(req)
				}
			})
		]
	}
]