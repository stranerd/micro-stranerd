import { IReferralRepository } from '../../domain/i-repositories/referrals'
import { ReferralMapper } from '../mappers/referrals'
import { Referral } from '../mongooseModels/referrals'
import { mongoose, parseQueryParams, QueryParams } from '@utils/commons'
import { ReferralFromModel, ReferralToModel } from '../models/referrals'

export class ReferralRepository implements IReferralRepository {
	private static instance: ReferralRepository
	private mapper = new ReferralMapper()

	static getInstance (): ReferralRepository {
		if (!ReferralRepository.instance) ReferralRepository.instance = new ReferralRepository()
		return ReferralRepository.instance
	}

	async getReferrals (query: QueryParams) {
		const data = await parseQueryParams<ReferralFromModel>(Referral, query)
		return {
			...data,
			results: data.results.map((n) => this.mapper.mapFrom(n)!)
		}
	}

	async findReferral (data: { userId: string, id: string }) {
		if (!mongoose.Types.ObjectId.isValid(data.id)) return null
		if (!mongoose.Types.ObjectId.isValid(data.userId)) return null
		const referral = await Referral.findOne({ _id: data.id, userId: data.userId })
		return this.mapper.mapFrom(referral)
	}

	async createReferral (data: ReferralToModel) {
		const referral = await new Referral(data).save()
		return this.mapper.mapFrom(referral)!
	}
}