import { makeController, Route, StatusCodes } from '@utils/app/package'
import { ReferralsController } from '../../controllers/users/referrals'
import { isAuthenticated } from '@application/middlewares'

export const referralsRoutes: Route[] = [
	{
		path: '/users/referrals/',
		method: 'get',
		controllers: [
			isAuthenticated,
			makeController(async (req) => {
				return {
					status: StatusCodes.Ok,
					result: await ReferralsController.getReferrals(req)
				}
			})
		]
	},
	{
		path: '/users/referrals/:id',
		method: 'get',
		controllers: [
			isAuthenticated,
			makeController(async (req) => {
				return {
					status: StatusCodes.Ok,
					result: await ReferralsController.findReferral(req)
				}
			})
		]
	}
]