import { BaseUseCase, QueryParams, QueryResults } from '@utils/commons'
import { BadgeEntity } from '../../entities/badges'
import { IBadgeRepository } from '../../i-repositories/badges'

export class GetBadgesUseCase implements BaseUseCase<QueryParams, QueryResults<BadgeEntity>> {
	repository: IBadgeRepository

	constructor (repo: IBadgeRepository) {
		this.repository = repo
	}

	async execute (input: QueryParams) {
		return await this.repository.getBadges(input)
	}
}