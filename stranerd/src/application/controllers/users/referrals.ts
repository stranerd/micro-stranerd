import { FindReferral, GetReferrals } from '@modules/users'
import { QueryParams, Request } from '@utils/commons'

export class ReferralsController {
	static async getReferrals (req: Request) {
		const query = req.body as QueryParams
		query.auth = [{ field: 'userId', value: req.authUser!.id }]
		return await GetReferrals.execute(query)
	}

	static async findReferral (req: Request) {
		return await FindReferral.execute({
			id: req.params.id,
			userId: req.authUser!.id
		})
	}
}