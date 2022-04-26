import { IBadgeRepository } from '../i-repositories/badges'
import { QueryParams } from '@utils/commons'
import { CountStreakBadges } from '../types/badges'
import { RankTypes } from '../entities/ranks'

export class BadgesUseCase {
	repository: IBadgeRepository

	constructor (repo: IBadgeRepository) {
		this.repository = repo
	}

	async find (id: string) {
		return await this.repository.findBadge(id)
	}

	async get (input: QueryParams) {
		return await this.repository.getBadges(input)
	}

	async recordCountStreak (input: { userId: string, activity: CountStreakBadges, add: boolean }) {
		return
		// eslint-disable-next-line no-unreachable
		return await this.repository.recordCountStreak(input.userId, input.activity, input.add)
	}

	async recordRank (input: { userId: string, rank: RankTypes, add: boolean }) {
		return
		// eslint-disable-next-line no-unreachable
		return await this.repository.recordRank(input.userId, input.rank, input.add)
	}
}