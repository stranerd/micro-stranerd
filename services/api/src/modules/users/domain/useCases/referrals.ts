import { IReferralRepository } from '../i-repositories/referrals'
import { ReferralToModel } from '../../data/models/referrals'
import { QueryParams } from '@utils/commons'

export class ReferralsUseCase {
	repository: IReferralRepository

	constructor (repo: IReferralRepository) {
		this.repository = repo
	}

	async create (input: ReferralToModel) {
		return await this.repository.createReferral(input)
	}

	async find (input: { userId: string, id: string }) {
		return await this.repository.findReferral(input)
	}

	async get (input: QueryParams) {
		return await this.repository.getReferrals(input)
	}
}