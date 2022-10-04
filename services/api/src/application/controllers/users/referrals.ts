import { ReferralsUseCases } from '@modules/users'
import { QueryParams, Request } from '@utils/app/package'

export class ReferralsController {
	static async getReferrals (req: Request) {
		const query = req.query as QueryParams
		query.auth = [{ field: 'userId', value: req.authUser!.id }]
		return await ReferralsUseCases.get(query)
	}

	static async findReferral (req: Request) {
		const referral = await ReferralsUseCases.find(req.params.id)
		if (!referral || referral.userId !== req.authUser!.id) return null
		return referral
	}
}