import { IReferralRepository } from '../irepositories/referrals'
import { ReferralToModel } from '../../data/models/referrals'
import { QueryParams } from '@utils/app/package'

export class ReferralsUseCase {
	repository: IReferralRepository

	constructor (repo: IReferralRepository) {
		this.repository = repo
	}

	async create (input: ReferralToModel) {
		return await this.repository.create(input)
	}

	async find (id: string) {
		return await this.repository.find(id)
	}

	async get (input: QueryParams) {
		return await this.repository.getReferrals(input)
	}
}