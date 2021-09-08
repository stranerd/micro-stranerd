import { makeController, requireAuthUser, Route, StatusCodes } from '@utils/commons'
import { ReviewsController } from '../../controllers/users/reviews'

export const reviewsRoutes: Route[] = [
	{
		path: '/reviews/',
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
		path: '/reviews/:id',
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
		path: '/reviews/',
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