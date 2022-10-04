import { ReferralEntity } from '../entities/referrals'
import { ReferralToModel } from '../../data/models/referrals'
import { QueryParams, QueryResults } from '@utils/app/package'

export interface IReferralRepository {
	find (id: string): Promise<ReferralEntity | null>

	create (data: ReferralToModel): Promise<ReferralEntity>

	getReferrals (query: QueryParams): Promise<QueryResults<ReferralEntity>>
}