import { makeController, requireAuthUser, Route, StatusCodes } from '@utils/commons'
import { ReferralsController } from '../../controllers/users/referrals'

export const referralsRoutes: Route[] = [
	{
		path: '/referrals/',
		method: 'get',
		controllers: [
			requireAuthUser,
			makeController(async (req) => {
				return {
					status: StatusCodes.Ok,
					result: await ReferralsController.getReferrals(req)
				}
			})
		]
	},
	{
		path: '/referrals/:id',
		method: 'get',
		controllers: [
			requireAuthUser,
			makeController(async (req) => {
				return {
					status: StatusCodes.Ok,
					result: await ReferralsController.findReferral(req)
				}
			})
		]
	}
]