import { BaseUseCase } from '@utils/commons'
import { BadgeEntity } from '../../entities/badges'
import { IBadgeRepository } from '../../i-repositories/badges'

export class FindBadgeUseCase implements BaseUseCase<string, BadgeEntity | null> {
	repository: IBadgeRepository

	constructor (repo: IBadgeRepository) {
		this.repository = repo
	}

	async execute (id: string) {
		return await this.repository.findBadge(id)
	}
}